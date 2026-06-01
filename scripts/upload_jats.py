#!/usr/bin/env python3
"""
Upload one or more JATS XML files to a Plone instance.

Steps:
  1. Parse each XML and find all local image references
     (<graphic> and <inline-graphic> with xlink:href).
  2. Upload each image to Plone via the REST API.
  3. Rewrite the xlink:href attributes to the uploaded image URLs.
  4. Submit the modified XML to @@upload_jats_view (multipart POST),
     mirroring the web-form upload flow.

Accepts multiple file paths and glob patterns, e.g.:
  upload_jats.py articles/*.xml --url ...
"""

import argparse
import base64
import glob as _glob
import mimetypes
import sys
from lxml import etree as ET
from pathlib import Path

import requests
from rich.console import Console
from rich.panel import Panel
from rich.progress import BarColumn, Progress, SpinnerColumn, TaskProgressColumn, TextColumn
from rich.table import Table

console = Console(stderr=False)
err_console = Console(stderr=True)

XLINK_NS = "http://www.w3.org/1999/xlink"
XLINK_HREF = f"{{{XLINK_NS}}}href"

# Elements that carry image references we care about
IMAGE_ELEMENTS = {"graphic", "inline-graphic"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description=(
            "Upload one or more JATS XML files (and their images) to a Plone instance. "
            "Glob patterns are supported, e.g. articles/*.xml"
        ),
    )
    parser.add_argument(
        "xml_files",
        nargs="+",
        metavar="xml_file",
        help="Path(s) to JATS XML file(s). Glob patterns are expanded automatically.",
    )
    parser.add_argument(
        "--url",
        required=True,
        help="Base URL of the Plone instance, e.g. http://localhost:8080/Plone",
    )
    parser.add_argument("--username", required=True, help="Plone username.")
    parser.add_argument("--password", required=True, help="Plone password.")
    parser.add_argument(
        "--container",
        default="",
        help=(
            "Plone path (relative to --url) where the article will be created, "
            "e.g. '/my-folder'.  Defaults to the site root."
        ),
    )
    parser.add_argument(
        "--images-container",
        default=None,
        dest="images_container",
        help=(
            "Plone path (relative to --url) where images will be uploaded. "
            "Defaults to the same value as --container."
        ),
    )
    parser.add_argument(
        "--jats-name",
        default=None,
        dest="jats_name",
        help=(
            "Title/name for the imported article in Plone. "
            "Only valid when uploading a single file. "
            "Defaults to the XML filename without extension."
        ),
    )
    return parser.parse_args()


def expand_paths(patterns: list[str]) -> list[Path]:
    """Expand a list of file paths / glob patterns to resolved Path objects."""
    paths: list[Path] = []
    for pattern in patterns:
        matched = _glob.glob(pattern, recursive=True)
        if matched:
            paths.extend(Path(p).resolve() for p in matched)
        else:
            # Treat as a literal path so missing-file errors are reported later
            paths.append(Path(pattern).resolve())
    # Deduplicate while preserving order
    seen: set[Path] = set()
    unique: list[Path] = []
    for p in paths:
        if p not in seen:
            seen.add(p)
            unique.append(p)
    return unique


def container_url(base_url: str, path: str) -> str:
    """Build an absolute URL for a Plone container path."""
    base = base_url.rstrip("/")
    path = path.strip("/")
    return f"{base}/{path}" if path else base


def extract_article_title(tree: ET.ElementTree) -> str | None:
    """Return the text content of the first <article-title> element, or None."""
    for elem in tree.iter():
        if not isinstance(elem.tag, str):
            continue
        local = elem.tag.split("}")[-1] if "}" in elem.tag else elem.tag
        if local == "article-title":
            return "".join(elem.itertext()).strip() or None
    return None


def find_image_refs(tree: ET.ElementTree) -> list[ET.Element]:
    """Return all graphic/inline-graphic elements with a local xlink:href."""
    refs = []
    for elem in tree.iter():
        if not isinstance(elem.tag, str):
            continue
        # Strip namespace prefix to get the local tag name
        local = elem.tag.split("}")[-1] if "}" in elem.tag else elem.tag
        if local in IMAGE_ELEMENTS:
            href = elem.get(XLINK_HREF, "")
            if href and not href.startswith(("http://", "https://", "ftp://")):
                refs.append(elem)
    return refs


def resolve_image_path(href: str, xml_dir: Path) -> Path:
    """
    Resolve an image href (which may use Windows backslashes) to an
    absolute filesystem path relative to the XML file's directory.
    """
    # Normalise Windows backslashes to forward slashes
    normalised = href.replace("\\", "/")
    return (xml_dir / normalised).resolve()


def upload_image(image_path: Path, images_url: str, auth: tuple[str, str]) -> str:
    """
    Upload an image file to Plone via the REST API.
    Returns the ``@id`` URL of the created Image object.
    """
    mime_type, _ = mimetypes.guess_type(str(image_path))
    if not mime_type:
        mime_type = "application/octet-stream"

    with open(image_path, "rb") as fh:
        data = base64.b64encode(fh.read()).decode("ascii")

    payload = {
        "@type": "Image",
        "title": image_path.name,
        "image": {
            "data": data,
            "encoding": "base64",
            "content-type": mime_type,
            "filename": image_path.name,
        },
    }

    response = requests.post(
        images_url,
        json=payload,
        auth=auth,
        headers={"Accept": "application/json"},
    )
    response.raise_for_status()
    result = response.json()
    uploaded_url = result.get("@id") or result.get("url")
    if not uploaded_url:
        raise ValueError(
            f"Plone did not return an @id for uploaded image '{image_path.name}'. "
            f"Response: {result}"
        )
    return uploaded_url


def upload_xml(
    xml_bytes: bytes,
    jats_name: str,
    article_url: str,
    auth: tuple[str, str],
) -> requests.Response:
    """
    POST the (modified) XML to @@upload_jats_view as a multipart form upload,
    matching the web-form fields expected by UploadJatsView.
    """
    upload_endpoint = f"{article_url.rstrip('/')}/@@upload-jats-view"
    files = {
        "jats_file": (f"{jats_name}.xml", xml_bytes, "application/xml"),
    }
    data = {"jats_name": jats_name}

    response = requests.post(
        upload_endpoint,
        files=files,
        data=data,
        auth=auth
    )
    response.raise_for_status()
    console.print(f"  [green]✓[/green] Upload succeeded with status [bold]{response.status_code}[/bold]")
    return response


def serialise_tree(tree: ET.ElementTree, original_xml: str) -> bytes:
    """
    Serialise the modified ElementTree back to bytes, preserving the
    original XML declaration and DOCTYPE if present.
    """
    # Collect lines that should precede the root element
    header_lines = []
    for line in original_xml.splitlines():
        stripped = line.strip()
        if stripped.startswith("<?xml") or stripped.startswith("<!DOCTYPE"):
            header_lines.append(line)
        else:
            break  # stop at first non-header line

    root = tree.getroot()
    # Register the xlink namespace so it is preserved with its canonical prefix
    ET.register_namespace("xlink", XLINK_NS)
    ET.register_namespace("mml", "http://www.w3.org/1998/Math/MathML")

    body = ET.tostring(root, encoding="unicode", xml_declaration=False)

    if header_lines:
        result = "\n".join(header_lines) + "\n" + body
    else:
        result = body

    return result.encode("utf-8")


def process_xml(
    xml_path: Path,
    jats_name: str | None,
    article_url: str,
    images_url: str,
    auth: tuple[str, str],
) -> None:
    """Process and upload a single JATS XML file."""
    original_xml = xml_path.read_text(encoding="utf-8")

    ET.register_namespace("xlink", XLINK_NS)
    ET.register_namespace("mml", "http://www.w3.org/1998/Math/MathML")
    parser = ET.XMLParser(remove_pis=False, remove_comments=False)
    tree = ET.parse(str(xml_path), parser)

    article_title = extract_article_title(tree)
    # Use explicit CLI name > JATS title > filename stem as fallback
    resolved_name = jats_name or article_title or xml_path.stem
    console.print(Panel(f"[bold]{resolved_name}[/bold]", title=str(xml_path), expand=False))

    # --- Step 1: find local image references ---
    image_elements = find_image_refs(tree)
    console.print(f"  Found [cyan]{len(image_elements)}[/cyan] local image reference(s).")

    # --- Step 2: upload images and rewrite hrefs ---
    uploaded: dict[str, str] = {}
    xml_dir = xml_path.parent

    with Progress(
        SpinnerColumn(),
        TextColumn("  [progress.description]{task.description}"),
        BarColumn(),
        TaskProgressColumn(),
        console=console,
        transient=True,
    ) as progress:
        task = progress.add_task("Uploading images…", total=len(image_elements))

        for elem in image_elements:
            href = elem.get(XLINK_HREF)
            if href in uploaded:
                elem.set(XLINK_HREF, uploaded[href])
                progress.advance(task)
                continue

            image_path = resolve_image_path(href, xml_dir)
            if not image_path.is_file():
                err_console.print(
                    f"  [yellow]⚠[/yellow]  Image not found, skipping: [dim]{image_path}[/dim]"
                )
                progress.advance(task)
                continue

            progress.update(task, description=f"Uploading [bold]{image_path.name}[/bold]…")
            try:
                plone_url = upload_image(image_path, images_url, auth)
            except requests.HTTPError as exc:
                err_console.print(
                    f"  [red]✗[/red] Error uploading [bold]{image_path.name}[/bold]: {exc}\n"
                    f"    Response: {exc.response.text}"
                )
                raise

            console.print(
                f"  [green]✓[/green] [bold]{image_path.name}[/bold] → [link={plone_url}]{plone_url}[/link]"
            )
            uploaded[href] = plone_url
            elem.set(XLINK_HREF, plone_url)
            progress.advance(task)

    # --- Step 3: serialise modified XML ---
    xml_bytes = serialise_tree(tree, original_xml)

    # --- Step 4: upload JATS XML ---
    with Progress(
        TextColumn("  "),
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
        transient=True,
    ) as progress:
        progress.add_task(f"Uploading JATS XML to [dim]{article_url}/@@upload-jats-view[/dim]…", total=None)
        try:
            upload_xml(xml_bytes, resolved_name, article_url, auth)
        except requests.HTTPError as exc:
            err_console.print(
                f"  [red]✗[/red] Error uploading JATS XML: {exc}\n    Response: {exc.response.text}"
            )
            raise

    console.print(f"  [green bold]✓ Done.[/green bold] Article [bold]{resolved_name!r}[/bold] imported successfully.\n")


def main() -> None:
    args = parse_args()

    xml_paths = expand_paths(args.xml_files)

    if args.jats_name and len(xml_paths) > 1:
        err_console.print(
            "[red]Error:[/red] --jats-name can only be used when uploading a single file."
        )
        sys.exit(1)

    auth = (args.username, args.password)
    article_url = container_url(args.url, args.container)
    images_url = container_url(
        args.url,
        args.images_container if args.images_container is not None else args.container,
    )

    # Register namespaces once before processing any files
    ET.register_namespace("xlink", XLINK_NS)
    ET.register_namespace("mml", "http://www.w3.org/1998/Math/MathML")

    errors: list[Path] = []
    for xml_path in xml_paths:
        if not xml_path.is_file():
            err_console.print(f"[red]Error:[/red] XML file not found: [bold]{xml_path}[/bold]")
            errors.append(xml_path)
            continue

        jats_name = args.jats_name  # None means: derive from JATS title / filename
        try:
            process_xml(xml_path, jats_name, article_url, images_url, auth)
        except Exception:
            errors.append(xml_path)

    # Summary table
    table = Table(title="Upload Summary", show_header=True, header_style="bold")
    table.add_column("File", style="dim")
    table.add_column("Status")
    for xml_path in xml_paths:
        if xml_path in errors:
            table.add_row(str(xml_path), "[red]✗ Failed[/red]")
        else:
            table.add_row(str(xml_path), "[green]✓ Success[/green]")
    console.print(table)

    if errors:
        err_console.print(
            f"\n[red bold]{len(errors)} file(s) failed.[/red bold]"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()

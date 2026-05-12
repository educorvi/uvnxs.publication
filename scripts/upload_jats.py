#!/usr/bin/env python3
"""
Upload a JATS XML file to a Plone instance.

Steps:
  1. Parse the XML and find all local image references
     (<graphic> and <inline-graphic> with xlink:href).
  2. Upload each image to Plone via the REST API.
  3. Rewrite the xlink:href attributes to the uploaded image URLs.
  4. Submit the modified XML to @@upload_jats_view (multipart POST),
     mirroring the web-form upload flow.
"""

import argparse
import base64
import mimetypes
import os
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

import requests

XLINK_NS = "http://www.w3.org/1999/xlink"
XLINK_HREF = f"{{{XLINK_NS}}}href"

# Elements that carry image references we care about
IMAGE_ELEMENTS = {"graphic", "inline-graphic"}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Upload a JATS XML file (and its images) to a Plone instance.",
    )
    parser.add_argument("xml_file", help="Path to the JATS XML file.")
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
            "Defaults to the XML filename without extension."
        ),
    )
    return parser.parse_args()


def container_url(base_url: str, path: str) -> str:
    """Build an absolute URL for a Plone container path."""
    base = base_url.rstrip("/")
    path = path.strip("/")
    return f"{base}/{path}" if path else base


def find_image_refs(tree: ET.ElementTree) -> list[ET.Element]:
    """Return all graphic/inline-graphic elements with a local xlink:href."""
    refs = []
    for elem in tree.iter():
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
) -> None:
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
    print(f"Upload succeeded with status {response.status_code}")
    return response


def serialise_tree(tree: ET.ElementTree, original_xml: str) -> bytes:
    """
    Serialise the modified ElementTree back to bytes, preserving the
    original XML declaration and DOCTYPE if present.
    """
    # Collect lines that should precede the root element
    header_lines = []
    for line in original_xml.splitlines():
        stripped = stripped_line = line.strip()
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


def main() -> None:
    args = parse_args()

    xml_path = Path(args.xml_file).resolve()
    if not xml_path.is_file():
        print(f"Error: XML file not found: {xml_path}", file=sys.stderr)
        sys.exit(1)

    jats_name = args.jats_name or xml_path.stem
    auth = (args.username, args.password)
    article_url = container_url(args.url, args.container)
    images_url = container_url(
        args.url,
        args.images_container if args.images_container is not None else args.container,
    )

    print(f"Reading XML: {xml_path}")
    original_xml = xml_path.read_text(encoding="utf-8")

    # Parse — register namespaces first so round-trip keeps prefixes
    ET.register_namespace("xlink", XLINK_NS)
    ET.register_namespace("mml", "http://www.w3.org/1998/Math/MathML")
    tree = ET.parse(xml_path)

    # --- Step 1: find local image references ---
    image_elements = find_image_refs(tree)
    print(f"Found {len(image_elements)} local image reference(s).")

    # --- Step 2: upload images and rewrite hrefs ---
    uploaded: dict[str, str] = {}  # original href -> Plone URL
    xml_dir = xml_path.parent

    for elem in image_elements:
        href = elem.get(XLINK_HREF)
        if href in uploaded:
            # Already uploaded this path; just reuse the URL
            elem.set(XLINK_HREF, uploaded[href])
            continue

        image_path = resolve_image_path(href, xml_dir)
        if not image_path.is_file():
            print(
                f"  Warning: image file not found, skipping: {image_path}",
                file=sys.stderr,
            )
            continue

        print(f"  Uploading image: {image_path.name} -> {images_url}")
        try:
            plone_url = upload_image(image_path, images_url, auth)
        except requests.HTTPError as exc:
            print(
                f"  Error uploading '{image_path.name}': {exc}\n"
                f"  Response: {exc.response.text}",
                file=sys.stderr,
            )
            sys.exit(1)

        print(f"    Uploaded as: {plone_url}")
        uploaded[href] = plone_url
        elem.set(XLINK_HREF, plone_url)

    # --- Step 3: serialise modified XML ---
    xml_bytes = serialise_tree(tree, original_xml)

    # --- Step 4: upload JATS XML ---
    print(f"Uploading JATS XML to: {article_url}/@@upload-jats-view")
    try:
        upload_xml(xml_bytes, jats_name, article_url, auth)
    except requests.HTTPError as exc:
        print(
            f"Error uploading JATS XML: {exc}\nResponse: {exc.response.text}",
            file=sys.stderr,
        )
        sys.exit(1)

    print(f"Done. Article '{jats_name}' imported successfully.")


if __name__ == "__main__":
    main()

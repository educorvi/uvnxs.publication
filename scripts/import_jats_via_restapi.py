#!/usr/bin/env python3
"""Import a JATS XML file into a Plone Document via plone.restapi.

The script keeps the Plone-side data model intentionally small:
- standard Document fields: title, description, text
- extra behavior fields: jats_*
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Iterable
from urllib.parse import urljoin

import argparse
import html
import json
import re
import requests
import sys
import xml.etree.ElementTree as ET


@dataclass
class ParsedJATS:
    title: str
    subtitle: str
    description: str
    body_html: str
    article_id: str
    doi: str
    article_type: str
    language: str
    journal_title: str
    abstract: str
    keywords: list[str]
    authors: list[str]
    pub_date: date | None
    license_text: str
    source_xml: str


def normalize_whitespace(value: str | None) -> str:
    if not value:
        return ""
    return re.sub(r"\s+", " ", value).strip()


def text_content(elem: ET.Element | None) -> str:
    if elem is None:
        return ""
    return normalize_whitespace("".join(elem.itertext()))


def first(root: ET.Element, *paths: str) -> ET.Element | None:
    for path in paths:
        elem = root.find(path)
        if elem is not None:
            return elem
    return None


def all_texts(root: ET.Element, *paths: str) -> list[str]:
    values: list[str] = []
    for path in paths:
        for elem in root.findall(path):
            value = text_content(elem)
            if value:
                values.append(value)
    return values


def parse_pub_date(article: ET.Element) -> date | None:
    for pub_date in article.findall(".//front/article-meta/pub-date"):
        y = text_content(pub_date.find("year"))
        m = text_content(pub_date.find("month")) or "1"
        d = text_content(pub_date.find("day")) or "1"
        try:
            return date(int(y), int(m), int(d))
        except (TypeError, ValueError):
            continue
    return None


def extract_authors(article: ET.Element) -> list[str]:
    authors: list[str] = []
    for contrib in article.findall(
        './/front/article-meta/contrib-group/contrib[@contrib-type="author"]'
    ):
        surname = text_content(contrib.find("name/surname"))
        given = text_content(contrib.find("name/given-names"))
        collab = text_content(contrib.find("collab"))
        if surname or given:
            authors.append(normalize_whitespace(f"{given} {surname}"))
        elif collab:
            authors.append(collab)
    return authors


def section_to_html(sec: ET.Element, level: int = 2) -> str:
    parts: list[str] = []
    title = text_content(sec.find("title"))
    heading_level = min(max(level, 2), 6)
    if title:
        parts.append(f"<h{heading_level}>{html.escape(title)}</h{heading_level}>")

    for child in sec:
        if child.tag == "p":
            text = text_content(child)
            if text:
                parts.append(f"<p>{html.escape(text)}</p>")
        elif child.tag == "sec":
            parts.append(section_to_html(child, level + 1))
        elif child.tag in {"list", "def-list"}:
            items: list[str] = []
            for item in child.findall("list-item"):
                item_text = text_content(item)
                if item_text:
                    items.append(f"<li>{html.escape(item_text)}</li>")
            if items:
                parts.append("<ul>" + "".join(items) + "</ul>")

    return "\n".join(parts)


def body_to_html(article: ET.Element) -> str:
    body = article.find("body")
    if body is None:
        return ""

    parts: list[str] = []
    for child in body:
        if child.tag == "sec":
            parts.append(section_to_html(child, 2))
        elif child.tag == "p":
            text = text_content(child)
            if text:
                parts.append(f"<p>{html.escape(text)}</p>")
    return "\n".join(p for p in parts if p)


def parse_jats(xml_path: Path, store_raw_xml: bool = False) -> ParsedJATS:
    source_xml = xml_path.read_text(encoding="utf-8")
    root = ET.fromstring(source_xml)
    article = root if root.tag == "article" else first(root, ".//article")
    if article is None:
        raise ValueError("No <article> element found in XML")

    title = text_content(
        first(article, ".//front/article-meta/title-group/article-title")
    )
    subtitle = text_content(
        first(article, ".//front/article-meta/title-group/subtitle")
    )

    abstract_parts = all_texts(
        article, ".//front/article-meta/abstract/p", ".//front/article-meta/abstract"
    )
    abstract = "\n\n".join(dict.fromkeys(v for v in abstract_parts if v))

    description = abstract.splitlines()[0].strip() if abstract else subtitle
    article_id = text_content(
        first(
            article,
            './/front/article-meta/article-id[@pub-id-type="publisher-id"]',
            ".//front/article-meta/article-id",
        )
    )
    doi = text_content(
        first(article, './/front/article-meta/article-id[@pub-id-type="doi"]')
    )
    article_type = article.attrib.get("article-type", "")
    language = article.attrib.get("{http://www.w3.org/XML/1998/namespace}lang", "")
    journal_title = text_content(
        first(
            article,
            ".//front/journal-meta/journal-title-group/journal-title",
            ".//front/journal-meta/journal-title",
        )
    )
    keywords = [
        v for v in all_texts(article, ".//front/article-meta/kwd-group/kwd") if v
    ]
    authors = extract_authors(article)
    pub_date = parse_pub_date(article)
    license_text = text_content(
        first(
            article,
            ".//front/article-meta/permissions/license/license-p",
            ".//front/article-meta/permissions/copyright-statement",
        )
    )
    body_html = body_to_html(article)

    return ParsedJATS(
        title=title or xml_path.stem,
        subtitle=subtitle,
        description=description,
        body_html=body_html,
        article_id=article_id,
        doi=doi,
        article_type=article_type,
        language=language,
        journal_title=journal_title,
        abstract=abstract,
        keywords=keywords,
        authors=authors,
        pub_date=pub_date,
        license_text=license_text,
        source_xml=source_xml if store_raw_xml else "",
    )


def slugify(value: str) -> str:
    value = normalize_whitespace(value).lower()
    value = re.sub(r"[^a-z0-9äöüß-]+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-") or "jats-import"


def build_payload(parsed: ParsedJATS, explicit_id: str | None = None) -> dict:
    payload: dict = {
        "@type": "Document",
        "id": explicit_id or slugify(parsed.title),
        "title": parsed.title,
        "description": parsed.description,
        "text": {
            "content-type": "text/html",
            "data": parsed.body_html or "<p></p>",
            "encoding": "utf-8",
        },
        "jats_article_id": parsed.article_id,
        "jats_doi": parsed.doi,
        "jats_article_type": parsed.article_type,
        "jats_language": parsed.language,
        "jats_journal_title": parsed.journal_title,
        "jats_title": parsed.title,
        "jats_subtitle": parsed.subtitle,
        "jats_abstract": parsed.abstract,
        "jats_keywords": parsed.keywords,
        "jats_authors": parsed.authors,
        "jats_license": parsed.license_text,
        "jats_source_xml": parsed.source_xml,
    }
    if parsed.pub_date is not None:
        payload["jats_pub_date"] = parsed.pub_date.isoformat()
    return payload


def auth_headers(token: str | None) -> dict[str, str]:
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    if token:
        headers["Authorization"] = token
    return headers


def create_document(
    api_base: str,
    container_path: str,
    payload: dict,
    username: str | None,
    password: str | None,
    token: str | None,
    timeout: int,
) -> requests.Response:
    api_base = api_base.rstrip("/") + "/"
    container_url = urljoin(api_base, container_path.lstrip("/"))
    auth = None if token else (username, password)
    response = requests.post(
        container_url,
        headers=auth_headers(token),
        auth=auth,
        data=json.dumps(payload).encode("utf-8"),
        timeout=timeout,
    )
    return response


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--api-base",
        required=True,
        help="Base URL of plone.restapi, e.g. http://localhost:8080/Plone/++api++",
    )
    parser.add_argument(
        "--container",
        default="/",
        help="Container path below api-base, e.g. /import or /news",
    )
    parser.add_argument("--xml", required=True, type=Path, help="Path to JATS XML file")
    parser.add_argument("--username", help="Basic-auth username")
    parser.add_argument("--password", help="Basic-auth password")
    parser.add_argument(
        "--token",
        help="Authorization header value, e.g. 'Bearer eyJ...' or 'Basic ...'",
    )
    parser.add_argument("--id", dest="explicit_id", help="Explicit Plone id")
    parser.add_argument(
        "--store-raw-xml",
        action="store_true",
        help="Store original XML in jats_source_xml",
    )
    parser.add_argument("--timeout", type=int, default=30)
    parser.add_argument(
        "--dry-run", action="store_true", help="Only print JSON payload"
    )
    args = parser.parse_args(list(argv))

    if not args.token and not (args.username and args.password):
        parser.error("Either --token or both --username and --password are required")

    return args


def main(argv: Iterable[str]) -> int:
    args = parse_args(argv)
    parsed = parse_jats(args.xml, store_raw_xml=args.store_raw_xml)
    payload = build_payload(parsed, explicit_id=args.explicit_id)

    if args.dry_run:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
        return 0

    response = create_document(
        api_base=args.api_base,
        container_path=args.container,
        payload=payload,
        username=args.username,
        password=args.password,
        token=args.token,
        timeout=args.timeout,
    )

    if response.status_code not in {200, 201}:
        sys.stderr.write(f"Import failed: HTTP {response.status_code}\n")
        try:
            sys.stderr.write(
                json.dumps(response.json(), ensure_ascii=False, indent=2) + "\n"
            )
        except Exception:
            sys.stderr.write(response.text + "\n")
        return 1

    try:
        print(json.dumps(response.json(), ensure_ascii=False, indent=2))
    except Exception:
        print(response.text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))

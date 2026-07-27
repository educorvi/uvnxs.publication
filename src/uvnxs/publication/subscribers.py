"""Event subscribers for uvnxs.publication content types."""

from __future__ import annotations

from .content.article import IArticle
from .views.common import get_api_client
from Acquisition import aq_parent
from lxml import etree as ET
from plone import api
from plone.rest.interfaces import IAPIRequest
from uvnxs.publication import logger
from zope.globalrequest import getRequest
from zope.lifecycleevent.interfaces import IObjectMovedEvent

import datetime
import jats_importexport_client


_XLINK_NS = "http://www.w3.org/1999/xlink"
_XLINK_HREF = f"{{{_XLINK_NS}}}href"

# Ordered list of custom-meta entries: (meta-name, article field, to_xml, from_xml)
_CUSTOM_META = [
    ("Beschreibender Typ", "beschreibender_typ", None, None),
    ("Bisherige Bestellnummer", "bisherige_bestellnummer", None, None),
    ("Webcode", "webcode", None, None),
    ("Organisationseinheit", "organisationseinheit", None, None),
    ("Fachbereich", "fachbereich", None, None),
    ("Sachgebiet", "sachgebiet", None, None),
    ("Status", "veroeffentlichungsstatus", None, None),
    ("Bildnachweis", "bildnachweis", None, None),
    (
        "Überschriften mit Nummerierung",
        "ueberschriften_mit_nummerierung",
        lambda v: "ja" if v else "nein",
        lambda v: v.lower() == "ja" if v else False,
    ),
]


# ── Shared low-level helpers ─────────────────────────────────────────────────


def _text(element: ET.Element, xpath: str) -> str | None:
    """Return stripped text of the first matching element, or None."""
    found = element.find(xpath)
    if found is not None and found.text:
        return found.text.strip() or None
    return None


def _parse_date(element: ET.Element, xpath: str) -> datetime.date | None:
    """Parse a JATS date element (day/month/year children) into a date."""
    date_el = element.find(xpath)
    if date_el is None:
        return None
    year = _text(date_el, "year")
    month = _text(date_el, "month")
    day = _text(date_el, "day")
    if not year:
        return None
    try:
        return datetime.date(
            int(year),
            int(month) if month else 1,
            int(day) if day else 1,
        )
    except (ValueError, TypeError):
        return None


def _sub(parent: ET.Element, tag: str, text: str | None = None) -> ET.Element:
    """Append a sub-element, optionally setting its text."""
    el = ET.SubElement(parent, tag)
    el.text = text
    return el


def _parse_front_content(content_raw: str) -> ET.Element | None:
    """Wrap content_raw in <front> and parse it; return root or None on error."""
    try:
        return ET.fromstring(f"<front>{content_raw}</front>".encode())
    except ET.XMLSyntaxError:
        return None


def _find_front(article) -> object | None:
    for item in article.objectValues():
        if getattr(item, "portal_type", None) == "Front":
            return item
    return None


# ── XML → Article ────────────────────────────────────────────────────────────


def _read_journal_meta(article, jm: ET.Element) -> None:
    article.journal_id = _text(jm, "journal-id")
    article.journal_title = _text(jm, "journal-title-group/journal-title")
    article.journal_subtitle = _text(jm, "journal-title-group/journal-subtitle")
    article.issn = _text(jm, "issn")
    article.publisher_name = _text(jm, "publisher/publisher-name")
    loc = jm.find("publisher/publisher-loc")
    if loc is not None:
        article.publisher_institution = _text(loc, "institution")
        article.publisher_addr_line = _text(loc, "addr-line")
        article.publisher_postal_code = _text(loc, "postal-code")
        article.publisher_city = _text(loc, "city")
        article.publisher_phone = _text(loc, "phone")
        article.publisher_email = _text(loc, "email")
        article.publisher_uri = _text(loc, "uri")
    else:
        for field in (
            "publisher_institution",
            "publisher_addr_line",
            "publisher_postal_code",
            "publisher_city",
            "publisher_phone",
            "publisher_email",
            "publisher_uri",
        ):
            setattr(article, field, None)


def _read_article_meta(article, am: ET.Element) -> None:
    article_id_el = am.find("article-id[@pub-id-type='publisher-id']")
    article.article_id = (
        article_id_el.text.strip()
        if article_id_el is not None and article_id_el.text
        else None
    )

    article.article_subtitle = _text(am, "title-group/subtitle")

    author = am.find("contrib-group/contrib[@contrib-type='Autor']")
    article.author_surname = (
        _text(author, "name/surname") if author is not None else None
    )

    co_author = am.find("contrib-group/contrib[@contrib-type='Co-Autor']")
    if co_author is not None:
        article.co_author_surname = _text(co_author, "name/surname")
        article.co_author_aff = _text(co_author, "aff")
    else:
        article.co_author_surname = None
        article.co_author_aff = None

    article.pub_date_ausgabedatum = _parse_date(
        am, "pub-date[@date-type='Ausgabedatum']"
    )
    article.pub_date_aktualisierte_fassung = _parse_date(
        am, "pub-date[@date-type='AktualisierteFassung']"
    )

    article.history_initial_publication = _text(
        am, "history/date[@date-type='initial-publication']/year"
    )
    article.history_correction = _text(am, "history/date[@date-type='correction']/year")
    article.history_latest_version = _text(
        am, "history/date[@date-type='latest-version']/year"
    )

    article.copyright_statement = _text(am, "permissions/copyright-statement")
    article.copyright_holder = _text(am, "permissions/copyright-holder")

    self_uri_el = am.find("self-uri")
    article.self_uri = (
        self_uri_el.get(_XLINK_HREF) or None if self_uri_el is not None else None
    )

    abstract_short = am.find("abstract[@abstract-type='short']")
    if abstract_short is not None:
        article.abstract_short_title = _text(abstract_short, "title")
        article.abstract_short = _text(abstract_short, "p")
    else:
        article.abstract_short_title = None
        article.abstract_short = None

    abstract_summary = am.find("abstract[@abstract-type='summary']")
    if abstract_summary is not None:
        article.abstract_summary_title = _text(abstract_summary, "title")
        article.abstract_summary = _text(abstract_summary, "p")
    else:
        article.abstract_summary_title = None
        article.abstract_summary = None

    kwd_group = am.find("kwd-group[@kwd-group-type='author-generated']")
    article.keywords = (
        [
            kwd.text.strip()
            for kwd in kwd_group.findall("kwd")
            if kwd.text and kwd.text.strip()
        ]
        if kwd_group is not None
        else []
    )

    custom_meta_map = {
        name_el.text.strip(): (
            value_el.text.strip() if value_el is not None and value_el.text else None
        )
        for cm in am.findall("custom-meta-group/custom-meta")
        if (name_el := cm.find("meta-name")) is not None and name_el.text
        for value_el in [cm.find("meta-value")]
    }

    for meta_name, field, _to_xml, from_xml in _CUSTOM_META:
        raw = custom_meta_map.get(meta_name)
        setattr(article, field, from_xml(raw) if from_xml else raw)


# ── Article → XML ────────────────────────────────────────────────────────────


def _build_journal_meta(article) -> ET.Element:
    jm = ET.Element("journal-meta")
    _sub(jm, "journal-id", getattr(article, "journal_id", None))

    tg = _sub(jm, "journal-title-group")
    _sub(tg, "journal-title", getattr(article, "journal_title", None))
    _sub(tg, "journal-subtitle", getattr(article, "journal_subtitle", None))

    _sub(jm, "issn", getattr(article, "issn", None))

    pub = _sub(jm, "publisher")
    _sub(pub, "publisher-name", getattr(article, "publisher_name", None))
    loc = _sub(pub, "publisher-loc")
    _sub(loc, "institution", getattr(article, "publisher_institution", None))
    _sub(loc, "addr-line", getattr(article, "publisher_addr_line", None))
    _sub(loc, "postal-code", getattr(article, "publisher_postal_code", None))
    _sub(loc, "city", getattr(article, "publisher_city", None))
    _sub(loc, "phone", getattr(article, "publisher_phone", None))
    _sub(loc, "email", getattr(article, "publisher_email", None))
    _sub(loc, "uri", getattr(article, "publisher_uri", None))

    return jm


def _build_article_meta(article) -> ET.Element:
    am = ET.Element("article-meta")

    article_id_el = _sub(am, "article-id", getattr(article, "article_id", None))
    article_id_el.set("pub-id-type", "publisher-id")

    fachbereich = getattr(article, "fachbereich", None)
    sachgebiet = getattr(article, "sachgebiet", None)
    cats = _sub(am, "article-categories")
    sg = _sub(cats, "subj-group")
    _sub(sg, "subject", fachbereich)
    if sachgebiet:
        inner_sg = _sub(sg, "subj-group")
        _sub(inner_sg, "subject", sachgebiet)

    tg = _sub(am, "title-group")
    _sub(tg, "article-title", getattr(article, "title", None))
    _sub(tg, "subtitle", getattr(article, "article_subtitle", None))

    cg = _sub(am, "contrib-group")
    author = _sub(cg, "contrib")
    author.set("contrib-type", "Autor")
    _sub(_sub(author, "name"), "surname", getattr(article, "author_surname", None))
    co = _sub(cg, "contrib")
    co.set("contrib-type", "Co-Autor")
    _sub(_sub(co, "name"), "surname", getattr(article, "co_author_surname", None))
    _sub(co, "aff", getattr(article, "co_author_aff", None))

    for date_type, field in (
        ("Ausgabedatum", "pub_date_ausgabedatum"),
        ("AktualisierteFassung", "pub_date_aktualisierte_fassung"),
    ):
        date_val: datetime.date | None = getattr(article, field, None)
        pd = _sub(am, "pub-date")
        pd.set("date-type", date_type)
        _sub(pd, "day", f"{date_val.day:02d}" if date_val else None)
        _sub(pd, "month", f"{date_val.month:02d}" if date_val else None)
        _sub(pd, "year", str(date_val.year) if date_val else None)

    history = _sub(am, "history")
    for date_type, field in (
        ("initial-publication", "history_initial_publication"),
        ("correction", "history_correction"),
        ("latest-version", "history_latest_version"),
    ):
        d = _sub(history, "date")
        d.set("date-type", date_type)
        _sub(d, "year", getattr(article, field, None))

    perms = _sub(am, "permissions")
    _sub(perms, "copyright-statement", getattr(article, "copyright_statement", None))
    _sub(perms, "copyright-holder", getattr(article, "copyright_holder", None))

    self_uri_el = ET.SubElement(am, "self-uri", nsmap={"xlink": _XLINK_NS})
    self_uri = getattr(article, "self_uri", None)
    if self_uri:
        self_uri_el.set(_XLINK_HREF, self_uri)

    for abstract_type, title_field, p_field in (
        ("short", "abstract_short_title", "abstract_short"),
        ("summary", "abstract_summary_title", "abstract_summary"),
    ):
        ab = _sub(am, "abstract")
        ab.set("abstract-type", abstract_type)
        _sub(ab, "title", getattr(article, title_field, None))
        _sub(ab, "p", getattr(article, p_field, None))

    kg = _sub(am, "kwd-group")
    kg.set("kwd-group-type", "author-generated")
    for kwd in getattr(article, "keywords", None) or []:
        _sub(kg, "kwd", kwd)

    cmg = _sub(am, "custom-meta-group")
    for meta_name, field, to_xml, _from_xml in _CUSTOM_META:
        cm = _sub(cmg, "custom-meta")
        _sub(cm, "meta-name", meta_name)
        value = getattr(article, field, None)
        _sub(cm, "meta-value", to_xml(value) if to_xml and value is not None else value)

    return am


# ── Event handlers ───────────────────────────────────────────────────────────


def update_article_metadata_from_front(front, event):
    """Sync Article metadata fields from Front.content_raw (Front added/modified)."""
    if getattr(front, "_updating_from_article", False):
        return

    content_raw = getattr(front, "content_raw", None)
    if not content_raw:
        return

    article = front.aq_parent
    if getattr(article, "portal_type", None) != "Article":
        return

    root = _parse_front_content(content_raw)
    if root is None:
        return

    jm = root.find("journal-meta")
    if jm is not None:
        _read_journal_meta(article, jm)

    am = root.find("article-meta")
    if am is not None:
        _read_article_meta(article, am)

    article.reindexObject()


def update_front_content_from_article(article, event):
    """Sync Front.content_raw from Article metadata fields (Article modified)."""
    front = _find_front(article)
    if front is None:
        return

    content_raw = getattr(front, "content_raw", None)
    root = _parse_front_content(content_raw) if content_raw else ET.Element("front")
    if root is None:
        root = ET.Element("front")

    new_jm = _build_journal_meta(article)
    old_jm = root.find("journal-meta")
    if old_jm is not None:
        root.replace(old_jm, new_jm)
    else:
        root.insert(0, new_jm)

    new_am = _build_article_meta(article)
    old_am = root.find("article-meta")
    if old_am is not None:
        root.replace(old_am, new_am)
    else:
        root.append(new_am)

    new_content_raw = "".join(ET.tostring(child, encoding="unicode") for child in root)

    # Prevent the Front subscriber from re-triggering an Article update
    front._updating_from_article = True
    try:
        front.content_raw = new_content_raw
    finally:
        front._updating_from_article = False


def create_front_and_body_in_article(article, event):
    """Create a front and body in the article when it is added."""
    if IObjectMovedEvent.providedBy(event):
        return  # Skip if the event is a move (not an add)

    if getattr(article, "portal_type", None) != "Article":
        return

    # Only create Front and Body if the request was sent from the add form and
    # not an API call
    request = getRequest()
    if IAPIRequest.providedBy(request):
        return

    body = None
    # Create Front and Body objects if they don't exist
    for sub_type in ("Front", "Body"):
        if not any(
            getattr(item, "portal_type", None) == sub_type
            for item in article.objectValues()
        ):
            article_child = api.content.create(
                container=article, type=sub_type, title=sub_type, id=sub_type.lower()
            )
            if sub_type == "Body":
                body = article_child

            if sub_type == "Front":
                # Initialize Front.content_raw with the current Article metadata
                update_front_content_from_article(article, event)

    if body is not None and request is not None:
        request.response.redirect(f"{body.absolute_url()}")


def article_ancestor_change_handler(obj, event):
    """
    Event handler to find and print the 'Article' ancestor of a modified object.
    """
    current_obj = obj
    while current_obj is not None:
        if IArticle.providedBy(current_obj):
            path = api.content.get_path(current_obj, relative=True)
            try:
                api_instance = jats_importexport_client.ExportApi(get_api_client())
                api_instance.clear_export_cache(path=path)
            except Exception as e:
                logger.error(f"Error clearing export cache for {path}: {e}")
            return
        # Traverse up the acquisition chain
        current_obj = aq_parent(current_obj)

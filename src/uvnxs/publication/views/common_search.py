import re


def get_document_for_article(obj):
    """Return a dictionary representation of the given article object."""
    pub_date = getattr(obj, "pub_date_ausgabedatum", None)
    pub_date_updated = getattr(obj, "pub_date_aktualisierte_fassung", None)
    return {
        "article_id": obj.article_id or "",
        "title": obj.title or "",
        "pub_date": pub_date.isoformat() if pub_date else "",
        "pub_date_updated": pub_date_updated.isoformat() if pub_date_updated else "",
        "rubrik": obj.journal_title or "",
        "fachbereich": obj.fachbereich or "",
        "sachgebiet": obj.sachgebiet or "",
        "url": obj.absolute_url(),
    }


def get_text_matches(text, query, radius=200, max_matches=10):
    try:
        pattern = re.compile(re.escape(query), re.IGNORECASE)
    except re.error:
        return []

    snippets = []
    for i, match in enumerate(pattern.finditer(text)):
        if i >= max_matches:
            break
        start = max(0, match.start() - radius)
        end = min(len(text), match.end() + radius)
        start_offset = match.start() - start
        end_offset = match.end() - start
        snippet_text = text[start:end]
        snippets.append({
            "start": start_offset,
            "end": end_offset,
            "snippet": snippet_text,
        })
    return snippets


def get_rubriken(documents):
    """Return a list of unique rubriken from the given documents."""
    return sorted({doc["rubrik"] for doc in documents if doc["rubrik"]})


def get_fachbereiche(documents):
    """Return a list of unique fachbereiche from the given documents."""
    return sorted({doc["fachbereich"] for doc in documents if doc["fachbereich"]})


def get_sachgebiete(documents):
    """Return a list of sachgebiete with their associated fachbereiche."""
    sachgebiete = {}
    for doc in documents:
        if not (sachgebiet := doc["sachgebiet"]):
            continue
        if sachgebiet not in sachgebiete:
            sachgebiete[sachgebiet] = []
        if (fachbereich := doc["fachbereich"]) and fachbereich not in sachgebiete[sachgebiet]:
            sachgebiete[sachgebiet].append(fachbereich)
    return [{"name": sg, "fachbereiche": fachbereiche} for sg, fachbereiche in sorted(sachgebiete.items())]

from plone import api

import re


def get_vur_landing_page():
    """Return the VurLandingPage object referenced by the default page property if it exists, otherwise None."""
    # try to get the landing page from the default page property (view) first
    site = api.portal.get()
    vur_landing_page_id = site.getProperty("default_page")
    if vur_landing_page_id:
        vur_landing_page = site.get(vur_landing_page_id)
        if vur_landing_page and vur_landing_page.portal_type == "VurLandingPage":
            return vur_landing_page

    # if no landing page is found via the default page property (view),
    # return the first root object that is a VurLandingPage
    for child in site.objectValues():
        if child.portal_type == "VurLandingPage":
            return child

    return None


def get_vur_folders(vur_landing_page=None):
    """Return a list of Folder objects referenced by the VurLandingPage."""
    if vur_landing_page is None:
        vur_landing_page = get_vur_landing_page()
    if not vur_landing_page:
        return []
    if not vur_landing_page.rubriken or len(vur_landing_page.rubriken) == 0:
        return []
    return [rubrik.to_object for rubrik in vur_landing_page.rubriken if rubrik.to_object]


def get_vur_folders_paths(vur_landing_page=None):
    vur_folders = get_vur_folders(vur_landing_page)
    return ["/".join(folder.getPhysicalPath()) for folder in vur_folders]


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
        "uid": obj.UID(),
    }


def get_documents(folders):
    """Return a list of document dictionaries for all articles in the given folders."""
    documents = []
    for folder in folders:
        for brain in folder.restrictedTraverse("@@contentlisting")():
            if getattr(brain, "portal_type", None) == "Article":
                documents.append(get_document_for_article(brain.getObject()))
    return documents


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
    """Return a list of fachbereiche with their associated rubriken."""
    fachbereiche = {}
    for doc in documents:
        if not (fachbereich := doc["fachbereich"]):
            continue
        if fachbereich not in fachbereiche:
            fachbereiche[fachbereich] = []
        if (rubrik := doc["rubrik"]) and rubrik not in fachbereiche[fachbereich]:
            fachbereiche[fachbereich].append(rubrik)
    return [{"name": fb, "rubriken": rubriken} for fb, rubriken in sorted(fachbereiche.items())]


def get_sachgebiete(documents):
    """Return a list of sachgebiete with their associated rubriken and fachbereiche."""
    sachgebiete = {}
    for doc in documents:
        if not (sachgebiet := doc["sachgebiet"]):
            continue
        if sachgebiet not in sachgebiete:
            sachgebiete[sachgebiet] = {"rubriken": [], "fachbereiche": []}
        if (rubrik := doc["rubrik"]) and rubrik not in sachgebiete[sachgebiet]["rubriken"]:
            sachgebiete[sachgebiet]["rubriken"].append(rubrik)
        if (fachbereich := doc["fachbereich"]) and fachbereich not in sachgebiete[sachgebiet]["fachbereiche"]:
            sachgebiete[sachgebiet]["fachbereiche"].append(fachbereich)
    return [
        {"name": sg, "rubriken": data["rubriken"], "fachbereiche": data["fachbereiche"]}
        for sg, data in sorted(sachgebiete.items())
    ]

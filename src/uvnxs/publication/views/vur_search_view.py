from plone import api
from Products.Five.browser import BrowserView
from Products.ZCTextIndex.ParseTree import ParseError
from uvnxs.publication.views.common_search import get_document_for_article
from uvnxs.publication.views.common_search import get_fachbereiche
from uvnxs.publication.views.common_search import get_rubriken
from uvnxs.publication.views.common_search import get_sachgebiete
from uvnxs.publication.views.common_search import get_text_matches
from zope.interface import implementer
from zope.interface import Interface

import json


class IVuRSearchView(Interface):
    """Marker Interface for VuR Search View"""


SEARCH_WEIGHTS = {
    "vorschrift": 1000,
    "vur_title": 100,
    "vur_fulltext": 1,
}
VORSCHRIFT_VALUE = "Muster-DGUV Vorschrift"


@implementer(IVuRSearchView)
class VuRSearchView(BrowserView):
    def __call__(self):
        self.query = (self.request.form.get("SearchableText") or "").strip()
        subject = self.request.form.get("Subject", None)
        if subject is None:
            self.subjects = []
        elif isinstance(subject, str):
            self.subjects = [subject]
        else:
            self.subjects = list(subject)

        try:
            documents = self._search(self.query, self.subjects)
            self.query_parse_error = None
        except ParseError as e:
            documents = []
            self.query_parse_error = str(e)

        self.documents_json = json.dumps(documents, ensure_ascii=False)
        self.sachgebiete_json = json.dumps(get_sachgebiete(documents), ensure_ascii=False)
        self.fachbereiche_json = json.dumps(get_fachbereiche(documents), ensure_ascii=False)
        self.rubriken_json = json.dumps(get_rubriken(documents), ensure_ascii=False)
        self.count = len(documents)
        self.has_results = self.count > 0
        self.has_query = self.query != ""
        self.has_subjects = len(self.subjects) > 0
        return self.index()

    def _search(self, query, subjects):
        if not query and not subjects:
            return []

        catalog = api.portal.get_tool("portal_catalog")
        search_paths = self._get_search_paths()
        brain_results = []
        brain_results_title = []
        fulltext_search = False

        if query:
            # An exact Webcode match wins, no further searching needed.
            brain_results = catalog(portal_type="Article", webcode=query, path=search_paths)
            if len(brain_results) == 0:
                # No exact Webcode match, continue with fulltext search
                fulltext_search = True
                brain_results = catalog(portal_type="Article", vur_fulltext=query, path=search_paths)
                brain_results_title = catalog(portal_type="Article", vur_title=query, path=search_paths)
        elif subjects:
            seen_uids = set()
            for subject in subjects:
                for brain in catalog(portal_type="Article", Subject=subject, path=search_paths):
                    if brain.UID in seen_uids:
                        continue
                    seen_uids.add(brain.UID)
                    brain_results.append(brain)

        documents = []
        uids_result_title = set(brain.UID for brain in brain_results_title)
        for brain in brain_results:
            article = brain.getObject()
            document = get_document_for_article(article)
            if fulltext_search:
                document["matches"] = get_text_matches(article.SearchableFullText(), query)
            score = 0
            score += SEARCH_WEIGHTS["vur_fulltext"] * len(document["matches"])
            if brain.UID in uids_result_title:
                score += SEARCH_WEIGHTS["vur_title"]
            if article.journal_title == VORSCHRIFT_VALUE:
                score += SEARCH_WEIGHTS["vorschrift"]

            document["score"] = score
            document["uid"] = brain.UID
            documents.append(document)
        return documents

    def _get_vur_landing_page(self):
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

    def _get_search_paths(self):
        vur_landing_page = self._get_vur_landing_page()
        if not vur_landing_page or not vur_landing_page.rubriken or len(vur_landing_page.rubriken) == 0:
            site = api.portal.get()
            return [site.absolute_url_path()]
        return ["/".join(rubrik.to_object.getPhysicalPath()) for rubrik in vur_landing_page.rubriken]

from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication.views.common_search import get_document_for_article
from uvnxs.publication.views.common_search import get_fachbereiche
from uvnxs.publication.views.common_search import get_rubriken
from uvnxs.publication.views.common_search import get_sachgebiete
from zope.interface import implementer
from zope.interface import Interface

import json


class IVuRSearchView(Interface):
    """Marker Interface for VuR Search View"""


@implementer(IVuRSearchView)
class VuRSearchView(BrowserView):
    def __call__(self):
        self.query = (self.request.form.get("SearchableText") or "").strip()
        documents = self._search(self.query) if self.query else []
        self.documents_json = json.dumps(documents, ensure_ascii=False)
        self.sachgebiete_json = json.dumps(
            get_sachgebiete(documents), ensure_ascii=False
        )
        self.fachbereiche_json = json.dumps(
            get_fachbereiche(documents), ensure_ascii=False
        )
        self.rubriken_json = json.dumps(get_rubriken(documents), ensure_ascii=False)
        self.count = len(documents)
        self.has_results = self.count > 0
        self.has_query = self.query != ""
        return self.index()

    def _search(self, query):
        catalog = api.portal.get_tool("portal_catalog")
        search_paths = self._get_search_paths()

        # An exact Webcode match wins, no further searching needed.
        webcode_brains = catalog(
            portal_type="Article", webcode=query, path=search_paths
        )
        if len(webcode_brains) > 0:
            return [
                get_document_for_article(webcode_brain.getObject())
                for webcode_brain in webcode_brains
            ]

        seen_uids = set()
        results = []
        for brain in catalog(
            portal_type="Article", vur_fulltext=query, path=search_paths
        ):
            if brain.UID in seen_uids:
                continue
            seen_uids.add(brain.UID)
            results.append(get_document_for_article(brain.getObject()))
        return results

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
        if (
            not vur_landing_page
            or not vur_landing_page.rubriken
            or len(vur_landing_page.rubriken) == 0
        ):
            site = api.portal.get()
            return [site.absolute_url_path()]
        return [
            rubrik.to_object.absolute_url_path() for rubrik in vur_landing_page.rubriken
        ]

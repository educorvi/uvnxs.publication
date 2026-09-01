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

        # An exact Webcode match wins, no further searching needed.
        webcode_brains = catalog(portal_type="Article", webcode=query)
        if len(webcode_brains) > 0:
            return [
                get_document_for_article(webcode_brain.getObject())
                for webcode_brain in webcode_brains
            ]

        seen_uids = set()
        results = []
        for brain in catalog(portal_type="Article", vur_fulltext=query):
            if brain.UID in seen_uids:
                continue
            seen_uids.add(brain.UID)
            results.append(get_document_for_article(brain.getObject()))
        return results

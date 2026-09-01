from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

import json

from uvnxs.publication.views.common_search import get_document_for_article, get_fachbereiche, get_sachgebiete


class IVuRFilterView(Interface):
    """Marker Interface for VuR Filter View"""


@implementer(IVuRFilterView)
class VuRFilterView(BrowserView):
    def __call__(self):
        documents = [
            get_document_for_article(doc)
            for doc in (
                brain.getObject()
                for brain in self.context.restrictedTraverse("@@contentlisting")()
                if brain.portal_type == "Article"
            )
        ]

        self.documents_json = json.dumps(documents, ensure_ascii=False)
        self.sachgebiete_json = json.dumps(get_sachgebiete(documents), ensure_ascii=False)
        self.fachbereiche_json = json.dumps(get_fachbereiche(documents), ensure_ascii=False)
        self.count = len(documents)
        return self.index()

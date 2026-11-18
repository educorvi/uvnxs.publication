from Products.Five.browser import BrowserView
from uvnxs.publication.views.common_search import get_documents
from uvnxs.publication.views.common_search import get_fachbereiche
from uvnxs.publication.views.common_search import get_sachgebiete
from zope.interface import implementer
from zope.interface import Interface

import json


class IVuRFilterView(Interface):
    """Marker Interface for VuR Filter View"""


@implementer(IVuRFilterView)
class VuRFilterView(BrowserView):
    def __call__(self):
        documents = get_documents([self.context])

        self.documents_json = json.dumps(documents, ensure_ascii=False)
        self.sachgebiete_json = json.dumps(get_sachgebiete(documents), ensure_ascii=False)
        self.fachbereiche_json = json.dumps(get_fachbereiche(documents), ensure_ascii=False)
        self.count = len(documents)
        return self.index()

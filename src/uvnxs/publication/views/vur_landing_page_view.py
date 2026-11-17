from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface
from uvnxs.publication.views.common_search import get_vur_folders
from uvnxs.publication.views.common_search import get_documents
from uvnxs.publication.views.common_search import get_sachgebiete
from uvnxs.publication.views.common_search import get_fachbereiche
from uvnxs.publication.views.common_search import get_rubriken

import json


class IVuRLandingPageView(Interface):
    """Marker Interface for VuR Landing Page View"""


@implementer(IVuRLandingPageView)
class VuRLandingPageView(BrowserView):
    def __call__(self):
        self.heading = self.context.title
        self.description = self.context.description
        self.filter_heading = "Dokumente filtern"
        self.no_results_message = "Keine Dokumente vorhanden."
        self.sort_by = "pub_date"

        self.text = "" if not self.context.text else self.context.text.raw

        documents = get_documents(get_vur_folders(self.context))
        self.documents_json = json.dumps(documents, ensure_ascii=False)
        self.sachgebiete_json = json.dumps(get_sachgebiete(documents), ensure_ascii=False)
        self.fachbereiche_json = json.dumps(get_fachbereiche(documents), ensure_ascii=False)
        self.rubriken_json = json.dumps(get_rubriken(documents), ensure_ascii=False)
        self.count = len(documents)

        self.query = ""
        self.has_results = self.count > 0
        self.has_query = False
        self.has_subjects = False

        return self.index()

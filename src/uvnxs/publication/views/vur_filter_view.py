from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

import json


class IVuRFilterView(Interface):
    """Marker Interface for VuR Filter View"""


@implementer(IVuRFilterView)
class VuRFilterView(BrowserView):
    def _document_for(self, doc):
        pub_date = getattr(doc, "pub_date_ausgabedatum", None)
        pub_date_updated = getattr(doc, "pub_date_aktualisierte_fassung", None)
        return {
            "article_id": doc.article_id or "",
            "title": doc.title or "",
            "pub_date": pub_date.isoformat() if pub_date else "",
            "pub_date_updated": pub_date_updated.isoformat()
            if pub_date_updated
            else "",
            "fachbereich": doc.fachbereich or "",
            "sachgebiet": doc.sachgebiet or "",
            "url": doc.absolute_url(),
        }

    def __call__(self):
        documents = [
            self._document_for(doc)
            for doc in (
                brain.getObject()
                for brain in self.context.restrictedTraverse("@@contentlisting")()
                if brain.portal_type == "Article"
            )
        ]
        self.documents_json = json.dumps(documents, ensure_ascii=False)

        sachgebiete = {}
        for doc in documents:
            if not (sachgebiet := doc["sachgebiet"]):
                continue
            if sachgebiet not in sachgebiete:
                sachgebiete[sachgebiet] = []
            if (fachbereich := doc["fachbereich"]) and fachbereich not in sachgebiete[
                sachgebiet
            ]:
                sachgebiete[sachgebiet].append(fachbereich)
        self.sachgebiete_json = json.dumps(
            [
                {"name": sg, "fachbereiche": fachbereiche}
                for sg, fachbereiche in sachgebiete.items()
            ],
            ensure_ascii=False,
        )

        fachbereiche = sorted({
            doc["fachbereich"] for doc in documents if doc["fachbereich"]
        })
        self.fachbereiche_json = json.dumps(fachbereiche, ensure_ascii=False)

        return self.index()

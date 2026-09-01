from Products.Five.browser import BrowserView


class JatsListView(BrowserView):
    def __call__(self):
        self.jats_documents = [
            {
                "title": doc.title,
                "subtitle": ", ".join(doc.article_subtitle),
                "url": doc.getURL(),
                "article-id": doc.article_id,
                "pub_date": doc.pub_date_ausgabedatum,
                "pub_date_updated": doc.pub_date_aktualisierte_fassung,
            }
            for doc in self.context.restrictedTraverse("@@contentlisting")()
        ]
        return self.index()

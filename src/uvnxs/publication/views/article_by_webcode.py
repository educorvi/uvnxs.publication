# from uvnxs.publication import _
from plone.app.contenttypes.browser.collection import CollectionView
from plone import api
from zope.interface import implementer
from zope.interface import Interface


# from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

class IArticleByWebcode(Interface):
    """ Marker Interface for IArticleByWebcode"""


@implementer(IArticleByWebcode)
class ArticleByWebcode(CollectionView):
    # If you want to define a template here, please remove the template from
    # the configure.zcml registration of this view.
    # template = ViewPageTemplateFile('article_by_webcode.pt')

    def __call__(self):
        self.webcode = self.request.get('webcode')
        self.brains = api.content.find(context=self.context, portal_type='Article', webcode=self.webcode)

        if len(self.brains) == 1:
            self.request.response.redirect(self.brains[0].getURL())
            return ""

        return super().__call__()

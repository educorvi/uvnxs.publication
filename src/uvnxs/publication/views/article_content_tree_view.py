# from uvnxs.publication import _
from AccessControl import getSecurityManager
from Acquisition import aq_base
from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface


class IArticleContentTreeView(Interface):
    """ Marker Interface for IArticleContentTreeView"""


@implementer(IArticleContentTreeView)
class ArticleContentTreeView(BrowserView):

    def content_tree(self, container=None):
        if container is None:
            container = self.context
        if not getattr(aq_base(container), 'isPrincipiaFolderish', False):
            return []

        security = getSecurityManager()
        return [
            {
                'title': child.Title() or child.getId(),
                'url': child.absolute_url(),
                'children': self.content_tree(child),
            }
            for child in container.objectValues()
            if security.checkPermission('View', child)
        ]

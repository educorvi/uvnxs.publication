from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

from uvnxs.publication import _
from uvnxs.publication.jats_models import JATSDocument


class IJATSHtmlView(Interface):
    """Marker Interface for IJATSHtmlView"""


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    def __call__(self):
        return self.index()

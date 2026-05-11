from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

from uvnxs.publication import _
from uvnxs.publication.exporters.html.html import HtmlExporter
from uvnxs.publication.jats_models import JATSDocument


class IJATSHtmlView(Interface):
    """Marker Interface for IJATSHtmlView"""


HTML_EXPORTER = HtmlExporter()


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    def __call__(self):
        jats = JATSDocument.from_plone(self.context)
        self.html = HTML_EXPORTER.export(jats)
        return self.index()

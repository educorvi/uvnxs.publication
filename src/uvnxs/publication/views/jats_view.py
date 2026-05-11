from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface

from uvnxs.publication import _
from uvnxs.publication.exporters.interface import Exporter
from uvnxs.publication.exporters.jats import JatsExporter
from uvnxs.publication.jats_models import JATSDocument


class IJATSView(Interface):
    """Marker Interface for IJATSView"""


EXPORTER: Exporter = JatsExporter()


@implementer(IJATSView)
class JATSView(BrowserView):
    def __call__(self):
        jats = JATSDocument.from_plone(self.context)
        return EXPORTER.export(jats)

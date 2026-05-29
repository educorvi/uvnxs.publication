import asyncio

from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface
from plone import api
import jats_importexport_client

from uvnxs.publication.views.common import get_api_client

class IJATSView(Interface):
    """Marker Interface for IJATSView"""



@implementer(IJATSView)
class JATSView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        ret = asyncio.run(api_instance.export_jats(path)).jats
        return ret

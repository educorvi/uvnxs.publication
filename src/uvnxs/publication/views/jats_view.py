from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication.views.common import get_api_client
from zope.interface import implementer
from zope.interface import Interface

import asyncio
import jats_importexport_client


class IJATSView(Interface):
    """Marker Interface for IJATSView"""


@implementer(IJATSView)
class JATSView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        ret = api_instance.export_jats(path).dict().get("jats", "")
        self.request.response.setHeader(
            "Content-Type", "application/xml; charset=utf-8"
        )
        return ret

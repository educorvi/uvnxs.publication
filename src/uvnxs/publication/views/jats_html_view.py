from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication.views.common import get_api_client
from zope.interface import implementer
from zope.interface import Interface

import jats_importexport_client


class IJATSHtmlView(Interface):
    """Marker Interface for IJATSHtmlView"""


class IJATSHtmlRawView(Interface):
    """Marker Interface for IJATSHtmlRawView"""


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        self.html = api_instance.export_html(path).dict().get("html", "")
        return self.index()


@implementer(IJATSHtmlRawView)
class JATSHtmlRawView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        html = api_instance.export_html(path).dict().get("html", "")
        self.request.response.setHeader("Content-Type", "text/html; charset=utf-8")
        return html

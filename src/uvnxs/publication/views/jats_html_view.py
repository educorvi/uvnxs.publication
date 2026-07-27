from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication import _
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
        try:
            self.html = api_instance.export_html(path).dict().get("html", "")
        except jats_importexport_client.exceptions.ServiceException:
            self.html = _(
                '<p class="error">Der Artikel kann nicht angezeigt werden, da Front und/oder Body fehlen</p>'  # noqa: E501
            )
        except Exception as e:
            self.html = _(
                "<p>Fehler beim Exportieren des Artikels zu HTML: {error}</p>"
            ).format(error=str(e))
        return self.index()


@implementer(IJATSHtmlRawView)
class JATSHtmlRawView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        html = api_instance.export_html(path).dict().get("html", "")
        self.request.response.setHeader("Content-Type", "text/html; charset=utf-8")
        return html

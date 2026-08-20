from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication import _
from uvnxs.publication import logger
from uvnxs.publication.views.common import get_api_client
from zope.interface import implementer
from zope.interface import Interface

import jats_importexport_client


class IJATSHtmlView(Interface):
    """Marker Interface for IJATSHtmlView"""


class IJATSHtmlRawView(Interface):
    """Marker Interface for IJATSHtmlRawView"""


class IJATSHtmlEditView(Interface):
    """Marker Interface for IJATSHtmlEditView"""


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        try:
            self.html = self.get_html(api_instance, path)
        except jats_importexport_client.exceptions.ServiceException:
            self.html = _(
                "The article cannot be displayed in HTML format because"
                " the body is missing."
            )
        except Exception as e:
            logger.exception(f"Error while exporting the article to HTML: {e}")
            self.html = _("Error while exporting the article to HTML.")
        return self.index()

    def get_html(self, api_instance, path):
        return api_instance.export_html(path).dict().get("html", "")


@implementer(IJATSHtmlRawView)
class JATSHtmlRawView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        html = api_instance.export_html(path).dict().get("html", "")
        self.request.response.setHeader("Content-Type", "text/html; charset=utf-8")
        return html


@implementer(IJATSHtmlEditView)
class JATSHtmlEditView(JATSHtmlView):
    def get_html(self, api_instance, path):
        return (
            api_instance
            .export_html(path, include_edit_links=True)
            .dict()
            .get("html", "")
        )

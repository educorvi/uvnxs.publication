from plone import api
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.services import Service
from zExceptions import BadRequest

from uvnxs.publication import logger
from uvnxs.publication.content.article import IArticle
from zope.component import adapter
from zope.interface import Interface
from zope.interface import implementer
from jats_importexport_client import ExportAsyncApi
from jats_importexport_client.exceptions import ApiException

from uvnxs.publication.views.common import get_api_client


@implementer(IExpandableElement)
@adapter(IArticle, Interface)
class ArticleExportStatus(object):

    def __init__(self, context, request):
        self.context = context.aq_explicit
        self.request = request

    def __call__(self, expand=False):
        export_type = self.request.form.get("export-type", "html")
        start = self.request.form.get("start", False)

        state = "In Progress"
        if IArticle.providedBy(self.context):
            api_instance = ExportAsyncApi(get_api_client())
            path = api.content.get_path(self.context, relative=True)

            if export_type not in ("html", "html_edit_links", "pdf"):
                raise BadRequest(
                    "Unsupported export-type. Supported values: html, html_edit_links, pdf"
                )
            try:
                if start:
                    if export_type == "pdf":
                        result = api_instance.export_pdf_async_with_http_info(path=path)
                    else:
                        result = api_instance.export_html_async_with_http_info(
                            path=path, include_edit_links=export_type == "html_edit_links"
                        )
                else:
                    result = api_instance.export_status_async_with_http_info(
                        path=path, export_type=export_type
                    )
                state = {
                    200: "Completed",
                    202: "In Progress",
                    404: "Not Found",
                    500: "Failed",
                }.get(result.status_code, "Error")
            except ApiException as e:
                state = {404: "Not Found", 500: "Failed"}.get(e.status, "Error")
                logger.error("Error exporting %s: %s", path, e)
            except Exception:
                state = "Error"
                logger.exception("Error exporting %s", path)
        return {
            "state": state
        }


class ArticleExportStatusGet(Service):

    def reply(self):
        service_factory = ArticleExportStatus(self.context, self.request)
        return service_factory(expand=True)

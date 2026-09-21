from plone import api
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.services import Service
from zExceptions import BadRequest

from uvnxs.publication import logger
from uvnxs.publication.content.article import IArticle
from zope.component import adapter
from zope.interface import Interface
from zope.interface import implementer
from jats_importexport_client import ExportAsyncApi, HtmlDocumentResponse

from uvnxs.publication.views.common import get_api_client


@implementer(IExpandableElement)
@adapter(IArticle, Interface)
class ArticleExportStatus(object):

    def __init__(self, context, request):
        self.context = context.aq_explicit
        self.request = request

    def __call__(self, expand=False):
        export_type = self.request.form.get("export-type", "html")
        if export_type != "html":
            raise BadRequest("Unsupported export-type. Supported values: html")

        state = "In Progress"
        if IArticle.providedBy(self.context):
            api_instance = ExportAsyncApi(get_api_client())
            path = api.content.get_path(self.context, relative=True)
            try:
                result = api_instance.export_html_async(path=path)
                if isinstance(result, HtmlDocumentResponse):
                    state = "Completed"
            except Exception as e:
                logger.error(
                    f"Error exporting {path}: {e}"
                )
        return {
            "state": state
        }


class ArticleExportStatusGet(Service):

    def reply(self):
        service_factory = ArticleExportStatus(self.context, self.request)
        return service_factory(expand=True)

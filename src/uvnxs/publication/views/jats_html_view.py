from jats_importexport_client import ExportApi
from jats_importexport_client import ExportAsyncApi
from jats_importexport_client import HtmlDocumentResponse
from jats_importexport_client.exceptions import ServiceException
from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication import _
from uvnxs.publication import logger
from uvnxs.publication.views.common import get_api_client
from zope.interface import implementer
from zope.interface import Interface


class IJATSHtmlView(Interface):
    """Marker Interface for IJATSHtmlView"""


class IJATSHtmlEditView(Interface):
    """Marker Interface for IJATSHtmlEditView"""


class IJATSHtmlRawView(Interface):
    """Marker Interface for IJATSHtmlRawView"""


class IJATSPdfView(Interface):
    """Marker Interface for IJATSPdfView"""


_HTML_TEMPLATE = """
<div class="article-shell row gx-10">
    <aside class="article-sidebar col-12 col-md-4 col-lg-3 col-xl-3">
        <div class="article-sidebar-panel border border-black article-fragment article-fragment--front">
            {front}
        </div>
    </aside>
    <div class="article-main col-12 col-md-8 col-lg-9 col-xl-9">
        <div class="article-header mt-5 mt-md-0">
            <div class="article-header-article-id">
                {article_id}
            </div>
            <h1 class="article-header-article-title">
                {article_title}
            </h1>
            <h2 class="article-header-article-subtitle">
                {article_subtitle}
            </h2>
            <div class="article-actions d-flex mt-4">
                <a class="article-action d-inline-flex align-items-center justify-content-center border border-black rounded-0 text-black text-decoration-none" href="{pdf_url}" download="{pdf_filename}" data-document-path="{document_path}">
                    <i class="ph ph-download-simple"></i>
                    <div class="spinner-border text-primary d-none" style="width: 1em; height: 1em; role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <span>{download_pdf}</span>
                </a>
                <a class="ms-4 article-action d-inline-flex align-items-center justify-content-center border border-black rounded-0 text-black text-decoration-none" href="{webcode_url}">
                    <i class="ph ph-books"></i>
                    <span>DGUV Medien</span>
                </a>
            </div>
        </div>
        <div class="article-fragment article-fragment--content">
            {html}
        </div>
    </div>
</div>
"""  # noqa: E501


def _get_html(context, include_edit_links=False, synchronous=False):
    """Get the HTML representation of the JATS XML content.
    Returns a tuple of (html, error_message)."""
    api_instance = (ExportApi if synchronous else ExportAsyncApi)(get_api_client())
    path = api.content.get_path(context, relative=True)
    try:
        export_html = api_instance.export_html if synchronous else api_instance.export_html_async
        response = export_html(path=path, include_edit_links=include_edit_links)
        if not isinstance(response, HtmlDocumentResponse):
            return None, None
        response_dict = response.dict()
        html = response_dict.get("html", "")
        front = response_dict.get("front", "")
        article_id = context.article_id
        article_title = context.title
        article_subtitle = (context.article_subtitle or [""])[0]
        pdf_url = context.absolute_url() + "/jats-pdf-view"
        pdf_filename = f"{article_title}.pdf"
        webcode_url = f"https://publikationen.dguv.de/DguvWebcode/index/query/{context.webcode}"
        return _HTML_TEMPLATE.format(
            front=front,
            html=html,
            article_id=article_id,
            article_title=article_title,
            article_subtitle=article_subtitle,
            pdf_url=pdf_url,
            pdf_filename=pdf_filename,
            download_pdf=api.portal.translate(_("Download PDF")),
            document_path=path,
            webcode_url=webcode_url,
        ), None
    except ServiceException:
        logger.error("ServiceException while exporting the article to HTML.")
        return None, _("The article cannot be displayed in HTML format because the body is missing.")
    except Exception as e:
        logger.exception(f"Error while exporting the article to HTML: {e}")
        return None, _("Error while exporting the article to HTML.")


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    INCLUDE_EDIT_LINKS = False
    REDIRECT_VIEW = None

    def __call__(self):
        html, error_message = _get_html(self.context, include_edit_links=self.INCLUDE_EDIT_LINKS)
        export_type = "html_edit_links" if self.INCLUDE_EDIT_LINKS else "html"
        if html is None and error_message is None:
            target_url = (
                self.context.absolute_url()
                + "/@@wait-for-export?export-type="
                + export_type
                + "&redirect-view="
                + (self.REDIRECT_VIEW or "")
            )
            self.request.response.redirect(target_url, status=302)
        self.html = html or error_message
        return self.index()


@implementer(IJATSHtmlEditView)
class JATSHtmlEditView(JATSHtmlView):
    INCLUDE_EDIT_LINKS = True
    REDIRECT_VIEW = "jats-html-edit-view"


@implementer(IJATSHtmlRawView)
class JATSHtmlRawView(BrowserView):
    def __call__(self):
        # Versioning subscribers consume this view directly and cannot follow redirects.
        html, error_message = _get_html(self.context, include_edit_links=False, synchronous=True)
        if error_message:
            self.request.response.setHeader("Content-Type", "text/plain; charset=utf-8")
            return error_message
        else:
            self.request.response.setHeader("Content-Type", "text/html; charset=utf-8")
            return html


@implementer(IJATSPdfView)
class JATSPdfView(BrowserView):
    def __call__(self):
        api_instance = ExportAsyncApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        try:
            response = api_instance.export_pdf_async_with_http_info(path=path)
            if response.status_code == 200:
                return response.data
            else:
                target_url = (
                    self.context.absolute_url() + "/@@wait-for-export?export-type=pdf&redirect-view=jats-pdf-view"
                )
                self.request.response.redirect(target_url, status=302)
            return response
        except ServiceException:
            logger.error("ServiceException while exporting the article to PDF.")
            return None
        except Exception as e:
            logger.exception(f"Error while exporting the article to PDF: {e}")
            return None

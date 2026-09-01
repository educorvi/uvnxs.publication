from plone import api
from Products.Five.browser import BrowserView
from uvnxs.publication import _
from uvnxs.publication import logger
from uvnxs.publication.views.common import get_api_client
from zope.interface import implementer
from zope.interface import Interface

import jats_importexport_client
import re


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
            <div class="article-actions d-flex mt-4">
                <a class="article-action d-inline-flex align-items-center justify-content-center border border-black rounded-0 text-black text-decoration-none" href="{pdf_url}" download="{pdf_filename}">
                    <img src="/++resource++uvnxs.publication/icons/download.svg" alt="" aria-hidden="true">
                    <div class="loading-indicator loading-indicator--orbit loading-indicator--swing-flip d-none" role="status" aria-live="polite" aria-label="Lädt">
                        <span class="loading-indicator__dot"></span>
                        <span class="loading-indicator__semi"></span>
                    </div>
                    <span>{download_pdf}</span>
                </a>
            </div>
        </div>
        <div class="article-fragment article-fragment--content">
            {html}
        </div>
    </div>
</div>
"""  # noqa: E501

# Regex for webcode links
WEBCODE_PATTERN = r"p\d{6}"
LINK_PATTERN = re.compile(
    rf"""(?P<prefix>
            <a\b[^>]*?\bhref\s*=\s*(?P<quote>["'])
        )
        https://publikationen\.dguv\.de/
        DguvWebcode/index/query/
        (?P<webcode>{WEBCODE_PATTERN})
        /?
        (?P=quote)
    """,
    re.IGNORECASE | re.VERBOSE,
)


def _get_target_url(webcode: str) -> str | None:
    catalog = api.portal.get_tool("portal_catalog")

    brains = catalog(
        portal_type="Article",
        webcode=webcode.lower(),
    )

    return brains[0].getURL() if brains else None


def _replace_external_publication_links(html: str):
    """Replace external links with internal links."""

    def replace(match: re.Match[str]) -> str:
        webcode = match.group("webcode").lower()
        target_url = _get_target_url(webcode)
        if target_url is None:
            return match.group(0)

        return f"{match.group('prefix')}{target_url}{match.group('quote')}"

    return LINK_PATTERN.sub(replace, html)


def _get_html(context, include_edit_links=False):
    """Get the HTML representation of the JATS XML content.
    Returns a tuple of (html, error_message)."""
    api_instance = jats_importexport_client.ExportApi(get_api_client())
    path = api.content.get_path(context, relative=True)
    try:
        response_dict = api_instance.export_html(
            path, include_edit_links=include_edit_links
        ).dict()
        html = response_dict.get("html", "")
        html = _replace_external_publication_links(html)
        front = response_dict.get("front", "")
        article_id = context.article_id
        article_title = context.title
        pdf_url = context.absolute_url() + "/jats-pdf-view"
        pdf_filename = f"{article_title}.pdf"
        return _HTML_TEMPLATE.format(
            front=front,
            html=html,
            article_id=article_id,
            article_title=article_title,
            pdf_url=pdf_url,
            pdf_filename=pdf_filename,
            download_pdf=api.portal.translate(_("Download PDF")),
        ), None
    except jats_importexport_client.exceptions.ServiceException:
        logger.error("ServiceException while exporting the article to HTML.")
        return None, _(
            "The article cannot be displayed in HTML format because"
            " the body is missing."
        )
    except Exception as e:
        logger.exception(f"Error while exporting the article to HTML: {e}")
        return None, _("Error while exporting the article to HTML.")


@implementer(IJATSHtmlView)
class JATSHtmlView(BrowserView):
    INCLUDE_EDIT_LINKS = False

    def __call__(self):
        html, error_message = _get_html(
            self.context, include_edit_links=self.INCLUDE_EDIT_LINKS
        )
        self.html = html or error_message
        return self.index()


@implementer(IJATSHtmlEditView)
class JATSHtmlEditView(JATSHtmlView):
    INCLUDE_EDIT_LINKS = True


@implementer(IJATSHtmlRawView)
class JATSHtmlRawView(BrowserView):
    def __call__(self):
        html, error_message = _get_html(self.context, include_edit_links=False)
        if error_message:
            self.request.response.setHeader("Content-Type", "text/plain; charset=utf-8")
            return error_message
        else:
            self.request.response.setHeader("Content-Type", "text/html; charset=utf-8")
            return html


@implementer(IJATSPdfView)
class JATSPdfView(BrowserView):
    def __call__(self):
        api_instance = jats_importexport_client.ExportApi(get_api_client())
        path = api.content.get_path(self.context, relative=True)
        try:
            response = api_instance.export_pdf(path)
            return response
        except jats_importexport_client.exceptions.ServiceException:
            logger.error("ServiceException while exporting the article to PDF.")
            return None
        except Exception as e:
            logger.exception(f"Error while exporting the article to PDF: {e}")
            return None

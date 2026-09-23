"""Export regressions that do not require a running Plone or export service."""

from jats_importexport_client import ExportApi
from jats_importexport_client import ExportAsyncApi
from jats_importexport_client import HtmlDocumentResponse
from jats_importexport_client.exceptions import ApiException
from unittest.mock import Mock
from unittest.mock import patch
from uvnxs.publication import subscribers
from uvnxs.publication.api.services.article_export_status import get as status
from uvnxs.publication.views import jats_html_view as html
from uvnxs.publication.views.common import TimeoutApiClient

import unittest


class TimeoutClientTests(unittest.TestCase):
    def test_generated_endpoints_reach_transport_with_timeout(self):
        for api_class, method in (
            (ExportApi, "export_html_without_preload_content"),
            (ExportAsyncApi, "export_html_async_without_preload_content"),
            (ExportAsyncApi, "export_pdf_async_without_preload_content"),
            (ExportAsyncApi, "export_status_async_without_preload_content"),
        ):
            for timeout in (None, (2.0, 30.0)):
                with (
                    self.subTest(method=method, timeout=timeout),
                    TimeoutApiClient() as client,
                    patch.object(client.rest_client, "request") as request,
                ):
                    kwargs = {"path": "/article", "_request_timeout": timeout}
                    if "status" in method:
                        kwargs["export_type"] = "html"
                    getattr(api_class(client), method)(**kwargs)
                    request.assert_called_once()
                    self.assertEqual(
                        request.call_args.kwargs["_request_timeout"],
                        timeout or (3.0, 15.0),
                    )


class HtmlSnapshotTests(unittest.TestCase):
    def test_version_subscriber_saves_synchronous_html_without_redirect(self):
        context = Mock(article_id="123", title="Article")
        context.absolute_url.return_value = "https://example.test/article"
        request = Mock()
        view = html.JATSHtmlRawView(context, request)
        with (
            patch.object(subscribers, "IArticle") as article,
            patch.object(subscribers, "getRequest", return_value=request),
            patch.object(subscribers, "get_change_note", return_value="Updated"),
            patch.object(html, "api") as api,
            patch.object(html, "get_api_client"),
            patch.object(html, "ExportApi") as sync_api,
            patch.object(html, "ExportAsyncApi") as async_api,
            patch.object(subscribers.api.content, "get_view") as get_view,
        ):
            article.providedBy.return_value = True
            api.content.get_path.return_value = "/article"
            api.portal.translate.return_value = "Download PDF"
            sync_api.return_value.export_html.return_value = HtmlDocumentResponse(
                html="<p>Snapshot body</p>", front="<p>Metadata</p>"
            )
            get_view.side_effect = [view, Mock(return_value="<article/>")]
            subscribers.save_jats_and_html_on_version(context, Mock())
            self.assertIn("<p>Snapshot body</p>", context.html_content_rev)
            self.assertEqual(context.jats_content_rev, "<article/>")
            sync_api.return_value.export_html.assert_called_once_with(path="/article", include_edit_links=False)
            async_api.assert_not_called()
            request.response.redirect.assert_not_called()

    def test_browser_html_still_uses_async_export(self):
        with (
            patch.object(html, "api"),
            patch.object(html, "get_api_client"),
            patch.object(html, "ExportAsyncApi") as async_api,
            patch.object(html, "ExportApi") as sync_api,
        ):
            self.assertEqual(html._get_html(Mock()), (None, None))
            async_api.return_value.export_html_async.assert_called_once()
            sync_api.assert_not_called()


class ExportStatusTests(unittest.TestCase):
    def test_status_and_start_report_terminal_errors(self):
        outcomes = (
            (Mock(status_code=200), "Completed"),
            (Mock(status_code=202), "In Progress"),
            (ApiException(status=404), "Not Found"),
            (ApiException(status=500), "Failed"),
            (ApiException(status=401), "Error"),
            (OSError("Connection failed"), "Error"),
        )
        for start in (False, True):
            for outcome, expected in outcomes:
                with self.subTest(start=start, state=expected):
                    context = Mock()
                    context.aq_explicit = context
                    request = Mock(form={"export-type": "pdf", "start": start})
                    with (
                        patch.object(status, "IArticle") as article,
                        patch.object(status, "api"),
                        patch.object(status, "get_api_client"),
                        patch.object(status, "logger"),
                        patch.object(status, "ExportAsyncApi") as export_api,
                    ):
                        article.providedBy.return_value = True
                        client = export_api.return_value
                        method = (
                            client.export_pdf_async_with_http_info
                            if start
                            else client.export_status_async_with_http_info
                        )
                        if isinstance(outcome, Exception):
                            method.side_effect = outcome
                        else:
                            method.return_value = outcome
                        self.assertEqual(
                            status.ArticleExportStatus(context, request)(),
                            {"state": expected},
                        )

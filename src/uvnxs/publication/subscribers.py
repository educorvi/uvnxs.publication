"""Event subscribers for uvnxs.publication content types."""

from __future__ import annotations

from .content.article import IArticle
from .views.common import get_api_client
from Acquisition import aq_parent
from plone import api
from plone.rest.interfaces import IAPIRequest
from uvnxs.publication import _
from uvnxs.publication import logger
from zope.globalrequest import getRequest
from plone.app.versioningbehavior.utils import get_change_note

import jats_importexport_client


def create_body_in_article(article, event):
    """Create body in the article when it is added."""

    if getattr(article, "portal_type", None) != "Article":
        return

    # Skip Body creation for plone.restapi requests.
    request = getRequest()
    if request is not None and IAPIRequest.providedBy(request):
        return

    body = None
    types = ("Body",)
    titles = (_("Body"),)
    # Create Body objects if they don't exist
    for i in range(len(types)):
        sub_type = types[i]
        if not any(
            getattr(item, "portal_type", None) == sub_type
            for item in article.objectValues()
        ):
            article_child = api.content.create(
                container=article,
                type=sub_type,
                title=titles[i],
                id=sub_type.lower(),
            )
            if sub_type == "Body":
                body = article_child

    if body is not None and request is not None:
        request.response.redirect(f"{body.absolute_url()}")


def article_ancestor_change_handler(obj, event):
    """
    Event handler to find and print the 'Article' ancestor of a modified object.
    """
    current_obj = obj
    while current_obj is not None:
        if IArticle.providedBy(current_obj):
            path = api.content.get_path(current_obj, relative=True)
            try:
                api_instance = jats_importexport_client.ExportApi(get_api_client())
                api_instance.clear_export_cache(path=path)
            except Exception as e:
                logger.error(f"Error clearing export cache for {path}: {e}")
            return
        # Traverse up the acquisition chain
        current_obj = aq_parent(current_obj)


def save_jats_and_html_on_version(obj, event):
    """
    Event handler to save JATS and HTML representations of an Article when it is versioned.
    """
    if not IArticle.providedBy(obj):
        return

    request = getRequest()
    if request:
        changeNote = get_change_note(request, None)
        if not changeNote:
            return

        obj.html_content_rev = api.content.get_view("jats-html-raw", obj)()
        obj.jats_content_rev = api.content.get_view("jats-view", obj)()

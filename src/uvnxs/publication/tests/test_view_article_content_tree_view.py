from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from uvnxs.publication.testing import FUNCTIONAL_TESTING
from uvnxs.publication.testing import INTEGRATION_TESTING
from uvnxs.publication.views.article_content_tree_view import IArticleContentTreeView
from zope.component import getMultiAdapter
from zope.interface.interfaces import ComponentLookupError

import unittest


class ViewsIntegrationTest(unittest.TestCase):
    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        api.content.create(self.portal, "Folder", "other-folder")
        api.content.create(self.portal, "Document", "front-page")

    def test_article_content_tree_view_is_registered(self):
        view = getMultiAdapter(
            (self.portal["other-folder"], self.portal.REQUEST),
            name="article-content-tree-view",
        )
        self.assertTrue(IArticleContentTreeView.providedBy(view))

    def test_article_content_tree_view_not_matching_interface(self):
        view_found = True
        try:
            view = getMultiAdapter(
                (self.portal["front-page"], self.portal.REQUEST),
                name="article-content-tree-view",
            )
        except ComponentLookupError:
            view_found = False
        else:
            view_found = IArticleContentTreeView.providedBy(view)
        self.assertFalse(view_found)


class ViewsFunctionalTest(unittest.TestCase):
    layer = FUNCTIONAL_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

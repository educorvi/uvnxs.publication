from plone import api
from plone.api.exc import InvalidParameterError
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from uvnxs.publication.content.article_media import IArticleMedia
from uvnxs.publication.testing import INTEGRATION_TESTING
from zope.component import createObject
from zope.component import queryUtility

import unittest


class ArticleMediaIntegrationTest(unittest.TestCase):
    layer = INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.parent = self.portal

    def test_ct_article_media_schema(self):
        fti = queryUtility(IDexterityFTI, name="ArticleMedia")
        schema = fti.lookupSchema()
        self.assertEqual(IArticleMedia, schema)

    def test_ct_article_media_fti(self):
        fti = queryUtility(IDexterityFTI, name="ArticleMedia")
        self.assertTrue(fti)

    def test_ct_article_media_factory(self):
        fti = queryUtility(IDexterityFTI, name="ArticleMedia")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IArticleMedia.providedBy(obj),
            f"IArticleMedia not provided by {obj}!",
        )

    def test_ct_article_media_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.portal,
            type="ArticleMedia",
            id="article_media",
        )

        self.assertTrue(
            IArticleMedia.providedBy(obj),
            f"IArticleMedia not provided by {obj.id}!",
        )

        parent = obj.__parent__
        self.assertIn("article_media", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("article_media", parent.objectIds())

    def test_ct_article_media_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="ArticleMedia")
        self.assertTrue(fti.global_allow, f"{fti.id} is not globally addable!")

    def test_ct_article_media_filter_content_type_true(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="ArticleMedia")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "article_media_id",
            title="ArticleMedia container",
        )
        self.parent = self.portal[parent_id]
        with self.assertRaises(InvalidParameterError):
            api.content.create(
                container=self.parent,
                type="Document",
                title="My Content",
            )

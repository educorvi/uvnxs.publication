from plone import api
from plone.api.exc import InvalidParameterError
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from uvnxs.publication.content.easy_section import IEasySection
from uvnxs.publication.testing import INTEGRATION_TESTING
from zope.component import createObject
from zope.component import queryUtility

import unittest


class EasySectionIntegrationTest(unittest.TestCase):
    layer = INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            "Body",
            self.portal,
            "parent_container",
            title="Parent container",
        )
        self.parent = self.portal[parent_id]

    def test_ct_easy_section_schema(self):
        fti = queryUtility(IDexterityFTI, name="EasySection")
        schema = fti.lookupSchema()
        self.assertEqual(IEasySection, schema)

    def test_ct_easy_section_fti(self):
        fti = queryUtility(IDexterityFTI, name="EasySection")
        self.assertTrue(fti)

    def test_ct_easy_section_factory(self):
        fti = queryUtility(IDexterityFTI, name="EasySection")
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IEasySection.providedBy(obj),
            f"IEasySection not provided by {obj}!",
        )

    def test_ct_easy_section_adding(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        obj = api.content.create(
            container=self.parent,
            type="EasySection",
            id="easy_section",
        )

        self.assertTrue(
            IEasySection.providedBy(obj),
            f"IEasySection not provided by {obj.id}!",
        )

        parent = obj.__parent__
        self.assertIn("easy_section", parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn("easy_section", parent.objectIds())

    def test_ct_easy_section_globally_not_addable(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="EasySection")
        self.assertFalse(fti.global_allow, f"{fti.id} is globally addable!")

    def test_ct_easy_section_filter_content_type_true(self):
        setRoles(self.portal, TEST_USER_ID, ["Contributor"])
        fti = queryUtility(IDexterityFTI, name="EasySection")
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            "easy_section_id",
            title="EasySection container",
        )
        self.parent = self.portal[parent_id]
        with self.assertRaises(InvalidParameterError):
            api.content.create(
                container=self.parent,
                type="Document",
                title="My Content",
            )


from uvnxs.publication.content.vur_landing_page import IVurLandingPage  # noqa: E501
from uvnxs.publication.testing import INTEGRATION_TESTING  # noqa
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from zope.component import createObject
from zope.component import queryUtility

import unittest




class VurLandingPageIntegrationTest(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        self.parent = self.portal

    def test_ct_vur_landing_page_schema(self):
        fti = queryUtility(IDexterityFTI, name='VurLandingPage')
        schema = fti.lookupSchema()
        self.assertEqual(IVurLandingPage, schema)

    def test_ct_vur_landing_page_fti(self):
        fti = queryUtility(IDexterityFTI, name='VurLandingPage')
        self.assertTrue(fti)

    def test_ct_vur_landing_page_factory(self):
        fti = queryUtility(IDexterityFTI, name='VurLandingPage')
        factory = fti.factory
        obj = createObject(factory)

        self.assertTrue(
            IVurLandingPage.providedBy(obj),
            f'IVurLandingPage not provided by {obj}!',
        )

    def test_ct_vur_landing_page_adding(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        obj = api.content.create(
            container=self.portal,
            type='VurLandingPage',
            id='vur_landing_page',
        )

        self.assertTrue(
            IVurLandingPage.providedBy(obj),
            f'IVurLandingPage not provided by {obj.id}!',
        )

        parent = obj.__parent__
        self.assertIn('vur_landing_page', parent.objectIds())

        # check that deleting the object works too
        api.content.delete(obj=obj)
        self.assertNotIn('vur_landing_page', parent.objectIds())

    def test_ct_vur_landing_page_globally_addable(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        fti = queryUtility(IDexterityFTI, name='VurLandingPage')
        self.assertTrue(
            fti.global_allow,
            f'{fti.id} is not globally addable!'
        )

    def test_ct_vur_landing_page_filter_content_type_false(self):
        setRoles(self.portal, TEST_USER_ID, ['Contributor'])
        fti = queryUtility(IDexterityFTI, name='VurLandingPage')
        portal_types = self.portal.portal_types
        parent_id = portal_types.constructContent(
            fti.id,
            self.portal,
            'vur_landing_page_id',
            title='VurLandingPage container',
        )
        self.parent = self.portal[parent_id]
        obj = api.content.create(
            container=self.parent,
            type='Document',
            title='My Content',
        )
        self.assertTrue(
            obj,
            f'Cannot add {obj.id} to {fti.id} container!'
        )

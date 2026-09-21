from uvnxs.publication.testing import FUNCTIONAL_TESTING
from uvnxs.publication.testing import INTEGRATION_TESTING
from uvnxs.publication.views.wait_for_export import IWaitForExport
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from zope.component import getMultiAdapter
from zope.interface.interfaces import ComponentLookupError

import unittest


class ViewsIntegrationTest(unittest.TestCase):

    layer = INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        setRoles(self.portal, TEST_USER_ID, ['Manager'])
        api.content.create(self.portal, 'Article', 'article')
        api.content.create(self.portal, 'Document', 'front-page')

    def test_wait_for_export_is_registered(self):
        view = getMultiAdapter(
            (self.portal['article'], self.portal.REQUEST),
            name='wait-for-export'
        )
        self.assertTrue(IWaitForExport.providedBy(view))

    def test_wait_for_export_not_matching_interface(self):
        view_found = True
        try:
            view = getMultiAdapter(
                (self.portal['front-page'], self.portal.REQUEST),
                name='wait-for-export'
            )
        except ComponentLookupError:
            view_found = False
        else:
            view_found = IWaitForExport.providedBy(view)
        self.assertFalse(view_found)


class ViewsFunctionalTest(unittest.TestCase):

    layer = FUNCTIONAL_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        setRoles(self.portal, TEST_USER_ID, ['Manager'])

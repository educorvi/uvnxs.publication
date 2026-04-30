# -*- coding: utf-8 -*-
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.behavior.interfaces import IBehavior
from uvnxs.publication.behaviors.jats_metadata import IJatsMetadataMarker
from uvnxs.publication.testing import INTEGRATION_TESTING  # noqa
from zope.component import getUtility

import unittest


class JatsMetadataIntegrationTest(unittest.TestCase):
    layer = INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def test_behavior_jats_metadata(self):
        behavior = getUtility(IBehavior, "uvnxs.publication.jats_metadata")
        self.assertEqual(
            behavior.marker,
            IJatsMetadataMarker,
        )

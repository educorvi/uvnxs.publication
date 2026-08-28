from Products.CMFCore.utils import getToolByName


def register_new_content_type(context):
    """Register the landing page type and its registry settings."""
    setup = getToolByName(context, "portal_setup")
    profile = "profile-uvnxs.publication:default"
    setup.runImportStepFromProfile(profile, "typeinfo")
    setup.runImportStepFromProfile(profile, "plone.app.registry")
    setup.runImportStepFromProfile(profile, "rolemap")

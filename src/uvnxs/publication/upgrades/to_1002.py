from Products.CMFCore.utils import getToolByName


def add_xml_editor_bundle(context):
    """Register the xml-editor web component bundle in the resource registry."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "plone.app.registry",
    )

from Products.CMFCore.utils import getToolByName


def reimport_registry_step(context):
    """Reimport registry step."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "plone.app.registry",
    )

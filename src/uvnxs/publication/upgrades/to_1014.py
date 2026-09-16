from Products.CMFCore.utils import getToolByName


def register_content_view(context):
    """Register the content view in Body's available view methods."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

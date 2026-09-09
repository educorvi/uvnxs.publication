from Products.CMFCore.utils import getToolByName


def update_workflow(context):
    """Update workflow for existing content. Images and Files are now also using the vur workflow."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "workflow",
    )

from Products.CMFCore.utils import getToolByName


def add_jats_list_view(context):
    """Register jats-list-view as an available view method on the Folder FTI."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

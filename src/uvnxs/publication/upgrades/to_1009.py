from Products.CMFCore.utils import getToolByName


def register_landing_page_view_and_folder_filter_view(context):
    """Register the new landing page view and folder filter view."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

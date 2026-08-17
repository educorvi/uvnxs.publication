from Products.CMFCore.utils import getToolByName


def register_new_article_edit_view(context):
    """Register the new article edit view, remove html raw view from display options."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

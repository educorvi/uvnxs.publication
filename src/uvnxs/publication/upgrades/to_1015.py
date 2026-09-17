from Products.CMFCore.utils import getToolByName


def register_content_view(context):
    """Make the tree view the default for article containers."""
    portal_types = getToolByName(context, "portal_types")
    for type_id in ("Body", "Back", "AppendixGroup"):
        fti = portal_types[type_id]
        if "content-view" not in fti.view_methods:
            fti.view_methods = (*tuple(fti.view_methods), "content-view")
        fti.default_view = "content-view"
        fti.immediate_view = "content-view"

from Products.CMFCore.utils import getToolByName


def delete_content_type_front(context):
    """Delete the content type Front and delete all Front objects in the portal."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )
    # Delete all Front objects in the portal
    catalog = getToolByName(context, "portal_catalog")
    for brain in catalog(portal_type="Front"):
        obj = brain.getObject()
        parent = obj.aq_parent
        parent.manage_delObjects([obj.id])

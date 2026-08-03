from Products.CMFCore.utils import getToolByName


def apply_type_changes(context):
    """to apply translation of body, avoid creating a new section via UI"""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

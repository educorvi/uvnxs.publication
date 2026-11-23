from AccessControl.Permission import getPermissionIdentifier
from plone import api

import logging


logger = logging.getLogger(__name__)
EASY_SECTION_PERMISSION = "uvnxs.publication: Add EasySection"


def delete_easy_sections(context):
    """Delete existing EasySection content, deepest objects first."""
    brains = api.content.find(portal_type="EasySection")
    for brain in sorted(brains, key=lambda brain: len(brain.getPath()), reverse=True):
        try:
            api.content.delete(obj=brain.getObject(), check_linkintegrity=False)
        except Exception as e:
            logger.error(f"Failed to delete EasySection {e}")


def remove_easy_section_permission(context):
    """Remove the role mapping stored on the site root for the deleted permission."""
    base = api.portal.get().aq_base
    base._p_activate()
    attribute = getPermissionIdentifier(EASY_SECTION_PERMISSION)
    if attribute in base.__dict__:
        delattr(base, attribute)

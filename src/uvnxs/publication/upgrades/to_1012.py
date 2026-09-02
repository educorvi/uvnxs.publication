from plone import api
from Products.CMFCore.utils import getToolByName


def add_article_searchable_text(context):
    """Reindex articles to add searchable text for existing content."""
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "catalog",
    )
    for brain in api.content.find(portal_type="Article"):
        brain.getObject().reindexObject(idxs=["vur_fulltext"])

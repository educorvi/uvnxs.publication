from plone import api


def add_article_searchable_text(context):
    """Reindex articles to add searchable text for existing content."""
    for brain in api.content.find(portal_type="Article"):
        brain.getObject().reindexObject(idxs=["vur_fulltext"])

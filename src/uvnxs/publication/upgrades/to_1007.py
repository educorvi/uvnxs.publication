from Products.CMFCore.utils import getToolByName


def convert_article_subtitles_to_lists(context):
    """Convert stored article subtitles and their catalog index to lists."""
    catalog = getToolByName(context, "portal_catalog")
    articles = [
        brain.getObject()
        for brain in catalog.unrestrictedSearchResults(portal_type="Article")
    ]

    if "article_subtitle" in catalog.indexes():
        catalog.delIndex("article_subtitle")
    catalog.addIndex("article_subtitle", "KeywordIndex")

    for article in articles:
        subtitle = getattr(article, "article_subtitle", None)
        if subtitle is None or subtitle == "":
            article.article_subtitle = []
        elif not isinstance(subtitle, list):
            article.article_subtitle = (
                list(subtitle) if isinstance(subtitle, tuple) else [subtitle]
            )
        article.reindexObject(idxs=["article_subtitle"])

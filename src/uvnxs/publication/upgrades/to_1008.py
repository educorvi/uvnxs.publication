from Products.CMFCore.utils import getToolByName


def update_article_metadata(context):
    """Update the article metadata.
    - activate behaviors (by rerunning typeinfo import step):
        - plone.relateditems (to extend related_articles)
        - nva.webcode.webcode (to replace webcode attribute)
        - plone.textindexer (to search for abstract_short and abstract_short_title)
    - rerun workflow import step to new vur workflow
    - migrations for
        - journal_title and journal_subtitle from Textline to choice fields TODO
        - move content from custom field "keywords" (list of strings) to
          plone.categorization "subjects" (tuple of strings)
        - not necessary for "webcode", as it is the same as the nva.webcode field
        - apply the plone workflow state based on the custom field
        "veroeffentlichungsstatus" and remove its content afterwards
    """
    setup = getToolByName(context, "portal_setup")
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "typeinfo",
    )

    # reload workflow settings
    setup.runImportStepFromProfile(
        "profile-uvnxs.publication:default",
        "workflow",
    )

    all_articles = context.portal_catalog(portal_type="Article")
    for brain in all_articles:
        article = brain.getObject()

        # migrate keywords to subject
        keywords = getattr(article, "keywords", None)
        if keywords:
            article.subjects = tuple(list(article.subjects) + keywords)
            article.keywords = None

        # migrate veroeffentlichungsstatus to plone workflow state
        # workflow_state_map = {
        #     "intern veröffentlicht": "internally_published",
        #     "veröffentlicht": "internally_published", # yes, also internally_published
        #     "zurückgezogen": "draft",
        #     "privat": "private",
        # }
        # veroeffentlichungsstatus = getattr(article, "veroeffentlichungsstatus", None)
        # if veroeffentlichungsstatus in workflow_state_map:
        #     api.content.transition(
        #         obj=article, to_state=workflow_state_map[veroeffentlichungsstatus]
        #     )
        article.veroeffentlichungsstatus = None

        # reindex to make sure abstract_short and abstract_short_title are indexed
        article.reindexObject()

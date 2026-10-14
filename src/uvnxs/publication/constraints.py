from plone.app.dexterity.behaviors.constrains import ConstrainTypesBehavior


_ARTICLE_SINGLETON_CHILD_TYPES = {"ArticleMedia", "Body", "Back"}


class ArticleConstrainTypes(ConstrainTypesBehavior):
    def allowedContentTypes(self, context=None):
        context = context or self.context
        allowed_types = super().allowedContentTypes(context)
        existing_singleton_types = {
            getattr(child, "portal_type", None)
            for child in context.objectValues()
            if getattr(child, "portal_type", None) in _ARTICLE_SINGLETON_CHILD_TYPES
        }
        if not existing_singleton_types:
            return allowed_types
        return [fti for fti in allowed_types if fti.getId() not in existing_singleton_types]

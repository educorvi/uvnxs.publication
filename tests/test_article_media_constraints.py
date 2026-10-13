from plone import api
from plone.base.interfaces.constrains import IConstrainTypes

import pytest


@pytest.mark.parametrize("portal_type", ["ArticleMedia", "Body", "Back"])
def test_article_only_allows_one_of_each_singleton_child_type(portal, portal_type):
    with api.env.adopt_roles(["Manager"]):
        article = api.content.create(
            container=portal,
            type="Article",
            id="article",
            title="Article",
            xml_lang="de",
        )

        allowed_types = IConstrainTypes(article).allowedContentTypes()
        allowed_type_ids = [fti.getId() for fti in allowed_types]
        has_existing_child = portal_type == "Body"
        if not has_existing_child and portal_type not in allowed_type_ids:
            pytest.fail(f"{portal_type} should be allowed before one exists")

        if not has_existing_child:
            api.content.create(
                container=article,
                type=portal_type,
                id=portal_type.lower(),
                title=portal_type,
            )

        allowed_types = IConstrainTypes(article).allowedContentTypes()
        if portal_type in [fti.getId() for fti in allowed_types]:
            pytest.fail(f"{portal_type} should be hidden after one exists")

        with pytest.raises(ValueError, match=portal_type):
            article.invokeFactory(
                portal_type,
                f"another-{portal_type.lower()}",
                title=f"Another {portal_type}",
            )

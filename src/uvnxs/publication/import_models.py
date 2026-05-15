from plone import api
from zope.event import notify
from zope.lifecycleevent import ObjectModifiedEvent
from uvnxs.publication.jats_models import *


class ArticlePloneImport:
    article: Article

    def __init__(self, article: Article):
        self.article = article

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_container = self._to(parent_container, name)
        FrontPloneImport(self.article.front)._import(new_container)
        BodyPloneImport(self.article.body)._import(new_container)
        BackPloneImport(self.article.back)._import(new_container)

        return new_container

    def _to(self, parent_container: object, name: str | None = None) -> object:
        new_article = api.content.create(
            container=parent_container,
            type="Article",
            title=name if name else "Article",
        )
        return new_article


class FrontPloneImport:
    front: Front

    def __init__(self, front: Front):
        self.front = front

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_front = self._to(parent_container, name)
        return new_front

    def _to(self, parent_container: object, name: str | None = None) -> object:
        new_front = api.content.create(
            container=parent_container, type="Front", title=name if name else "Front"
        )
        new_front.content_raw = self.front.content_raw
        notify(ObjectModifiedEvent(new_front))
        return new_front


class BodyPloneImport:
    body: Body

    def __init__(self, body: Body):
        self.body = body

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_body = self._to(parent_container, name)
        for section in self.body.sections:
            SectionPloneImport(section)._import(new_body)
        return new_body

    def _to(self, parent_container: object, name: str | None = None) -> object:
        new_body = api.content.create(
            container=parent_container, type="Body", title=name if name else "Body"
        )
        return new_body


class BackPloneImport:
    back: Back

    def __init__(self, back: Back):
        self.back = back

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_back = self._to(parent_container, name)
        for app_group in self.back.appendix_groups:
            AppendixGroupPloneImport(app_group)._import(new_back)
        return new_back

    def _to(self, parent_container: object, name: str | None = None) -> object:
        new_back = api.content.create(
            container=parent_container, type="Back", title=name if name else "Back"
        )
        return new_back


class SectionPloneImport:
    section: Section

    def __init__(self, section: Section):
        self.section = section

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_section = self._to(parent_container, name)
        for subsection in self.section.sections:
            SectionPloneImport(subsection)._import(new_section)
        return new_section

    def _to(self, parent_container: object, name: str | None = None) -> object:
        title = (
            name if name else (self.section.title if self.section.title else "Section")
        )
        title = f"{title} (Section)" if title != "Section" else title
        new_section = api.content.create(
            container=parent_container,
            type="Section",
            title=title,
        )
        new_section.sec_type = self.section.sec_type
        new_section.label = self.section.label
        # new_section.title = self.section.title
        new_section.label_title_raw = self.section.label_title_raw
        new_section.content_raw = self.section.content_raw
        return new_section


class AppendixGroupPloneImport:
    app_group: AppendixGroup

    def __init__(self, app_group: AppendixGroup):
        self.app_group = app_group

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_app_group = self._to(parent_container, name)
        for appendix in self.app_group.appendixes:
            AppendixPloneImport(appendix)._import(new_app_group)
        return new_app_group

    def _to(self, parent_container: object, name: str | None = None) -> object:
        title = (
            name
            if name
            else (self.app_group.title if self.app_group.title else "AppendixGroup")
        )
        title = f"{title} (AppendixGroup)" if title != "AppendixGroup" else title
        new_app_group = api.content.create(
            container=parent_container,
            type="AppendixGroup",
            title=title,
        )
        new_app_group.sec_type = self.app_group.sec_type
        new_app_group.label = self.app_group.label
        # new_app_group.title = self.app_group.title
        new_app_group.label_title_raw = self.app_group.label_title_raw
        new_app_group.content_raw = self.app_group.content_raw
        return new_app_group


class AppendixPloneImport:
    appendix: Appendix

    def __init__(self, appendix: Appendix):
        self.appendix = appendix

    def _import(self, parent_container: object, name: str | None = None) -> object:
        new_appendix = self._to(parent_container, name)
        for section in self.appendix.sections:
            SectionPloneImport(section)._import(new_appendix)
        return new_appendix

    def _to(self, parent_container: object, name: str | None = None) -> object:
        title = (
            name
            if name
            else (self.appendix.title if self.appendix.title else "Appendix")
        )
        title = f"{title} (Appendix)" if title != "Appendix" else title
        new_appendix = api.content.create(
            container=parent_container,
            type="Appendix",
            title=title,
        )
        new_appendix.sec_type = self.appendix.sec_type
        new_appendix.label = self.appendix.label
        # new_appendix.title = self.appendix.title
        new_appendix.label_title_raw = self.appendix.label_title_raw
        new_appendix.content_raw = self.appendix.content_raw
        return new_appendix


class JATSDocumentPloneImport:
    def __init__(
        self,
        jats: JATSDocument,
        jats_name: str,
        context: object,  # the container in which the JATS content should be imported
    ):
        self.jats = jats
        self.name = jats_name
        self.context = context

    def import_jats(self) -> tuple[bool, str]:
        """
        Imports the JATS document into Plone and creates the necessary content.
        Returns a tuple of (success, message).
        """
        try:
            article = ArticlePloneImport(self.jats.article)._import(
                self.context, self.name
            )
            return True, f"JATS XML imported successfully as '{article.title}'"
        except Exception as e:
            return False, f"Error importing JATS XML: {e}"

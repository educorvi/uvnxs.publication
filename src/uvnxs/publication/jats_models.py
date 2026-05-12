from __future__ import annotations
import os
from io import BytesIO
import xmlschema
from lxml import etree as ET


class JATSDocument:
    article: Article

    def __init__(self, article: Article):
        self.article = article

    @classmethod
    def from_xml(cls, xml_content: str, xsd_path: str | None) -> JATSDocument:
        if xsd_path is not None:
            if not cls._file_exists(xsd_path):
                raise FileNotFoundError(f"XSD file not found: {xsd_path}")
            if not cls._validate_xml(xml_content, xsd_path):
                raise ValueError(f"XML is not valid according to the XSD:")
        parser = ET.XMLParser(remove_pis=False, remove_comments=False)
        tree = ET.parse(BytesIO(xml_content.encode('utf-8')), parser=parser)
        root = tree.getroot()
        if root.tag != "article":
            raise ValueError(f"Expected root element 'article', got '{root.tag}'")
        article = Article.from_xml_element(root)
        return cls(article=article)

    @classmethod
    def from_plone(cls, plone_article: object) -> JATSDocument:
        if getattr(plone_article, "portal_type", None) != "Article":
            raise ValueError("Provided object is not an Article")

        article = Article.from_plone(plone_article)
        return cls(article=article)

    @staticmethod
    def _file_exists(file_path: str) -> bool:
        return os.path.isfile(file_path)

    @staticmethod
    def _validate_xml(xml_content: str, xsd_path: str) -> bool:
        schema = xmlschema.XMLSchema(xsd_path)
        return schema.is_valid(xml_content)


class Article:
    front: Front
    body: Body
    back: Back

    def __init__(self, front: Front, body: Body, back: Back):
        self.front = front
        self.body = body
        self.back = back

    @classmethod
    def from_xml_element(cls, article: ET.Element) -> Article:
        front_element = article.find("front")
        body_element = article.find("body")
        back_element = article.find("back")
        if front_element is None or body_element is None or back_element is None:
            raise ValueError(
                "Article element must contain 'front', 'body', and 'back' elements"
            )
        front = Front.from_xml_element(front_element)
        body = Body.from_xml_element(body_element)
        back = Back.from_xml_element(back_element)
        return cls(front=front, body=body, back=back)

    @classmethod
    def from_plone(cls, plone_article: object) -> Article:
        if getattr(plone_article, "portal_type", None) != "Article":
            raise ValueError("Provided object is not an Article")
        front = body = back = None

        for element in plone_article.restrictedTraverse("contentlisting")():
            element = element.getObject()
            if getattr(element, "portal_type", None) == "Front":
                front = Front.from_plone(element)
            elif getattr(element, "portal_type", None) == "Body":
                body = Body.from_plone(element)
            elif getattr(element, "portal_type", None) == "Back":
                back = Back.from_plone(element)
        if not all([front, body, back]):
            raise ValueError("Article must contain Front, Body, and Back")
        return cls(front=front, body=body, back=back)


class Front:
    content_raw: str | None

    def __init__(self, content_raw: str | None):
        self.content_raw = content_raw

    @classmethod
    def from_xml_element(cls, element: ET.Element) -> Front:
        content_raw = cls._get_raw_content(element)
        return cls(content_raw=content_raw)

    @classmethod
    def from_plone(cls, plone_front: object) -> Front:
        if getattr(plone_front, "portal_type", None) != "Front":
            raise ValueError("Provided object is not a Front")
        content_raw = getattr(plone_front, "content_raw", None)
        return cls(content_raw=content_raw)

    @classmethod
    def _get_raw_content(cls, front: ET.Element) -> str | None:
        result = ""
        for elem in front:
            result += ET.tostring(elem, encoding="unicode")
        if result == "":
            return None
        return result


class Body:
    sections: list[Section]

    def __init__(self, sections: list[Section]):
        self.sections = sections

    @classmethod
    def from_xml_element(cls, body: ET.Element) -> Body:
        sections = [
            Section.from_xml_element(sec_elem) for sec_elem in body.findall("sec")
        ]
        return cls(sections=sections)

    @classmethod
    def from_plone(cls, plone_body: object) -> Body:
        if getattr(plone_body, "portal_type", None) != "Body":
            raise ValueError("Provided object is not a Body")
        sections = []
        for sec in plone_body.restrictedTraverse("contentlisting")():
            sec = sec.getObject()
            if getattr(sec, "portal_type", None) == "Section":
                sections.append(Section.from_plone(sec))
        return cls(sections=sections)


class Back:
    appendix_groups: list[AppendixGroup]

    def __init__(self, appendix_groups: list[AppendixGroup]):
        self.appendix_groups = appendix_groups

    @classmethod
    def from_xml_element(cls, element: ET.Element) -> Back:
        appendix_groups = [
            AppendixGroup.from_xml_element(app_group)
            for app_group in element.findall("app-group")
        ]
        return cls(appendix_groups=appendix_groups)

    @classmethod
    def from_plone(cls, plone_back: object) -> Back:
        if getattr(plone_back, "portal_type", None) != "Back":
            raise ValueError("Provided object is not a Back")
        appendix_groups = []
        for app_group in plone_back.restrictedTraverse("contentlisting")():
            app_group = app_group.getObject()
            if getattr(app_group, "portal_type", None) == "AppendixGroup":
                appendix_groups.append(AppendixGroup.from_plone(app_group))
        return cls(appendix_groups=appendix_groups)


class GeneralSection:
    sec_type: str | None
    label: str | None
    title: str | None
    label_title_raw: str
    content_raw: str | None

    def __init__(
        self,
        sec_type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
    ):
        self.sec_type = sec_type
        self.label = label
        self.title = title
        self.label_title_raw = label_title_raw
        self.content_raw = content_raw

    @classmethod
    def _get_label_and_title(
        cls, section: ET.Element
    ) -> tuple[str | None, str | None, str]:
        label_element = section.find("label")
        label_string = (
            ET.tostring(label_element, encoding="unicode")
            if label_element is not None
            else ""
        )
        title_element = section.find("title")
        title_string = (
            ET.tostring(title_element, encoding="unicode")
            if title_element is not None
            else ""
        )
        label_title_raw = label_string + title_string
        label = label_element.text if label_element is not None else None
        title = cls._get_title(title_element)
        return label, title, label_title_raw

    @classmethod
    def _get_title(cls, title_or_named_content: ET.Element | None) -> str | None:
        if title_or_named_content is None:
            return None
        named_content = title_or_named_content.find("named-content")
        if named_content is not None:
            return cls._get_title(named_content)
        else:
            return title_or_named_content.text

    @classmethod
    def _get_raw_content(cls, section: ET.Element) -> str | None:
        result = ""
        for node in section.xpath("./node()"):
            if isinstance(node, str):
                result += node
                continue

            if not isinstance(node.tag, str):
                result += ET.tostring(node, encoding="unicode")
                continue

            if node.tag in ["label", "title"]:
                if node.tail:
                    result += node.tail
                continue
            if node.tag in ["sec", "app"]:
                break

            result += ET.tostring(node, encoding="unicode")

        if result.strip() == "":
            return None
        return result


class Section(GeneralSection):
    sections: list[Section]

    def __init__(
        self,
        sec_type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        sections: list[Section],
    ):
        super().__init__(
            sec_type=sec_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.sections = sections

    @classmethod
    def from_xml_element(cls, section: ET.Element) -> Section:
        sec_type = section.attrib.get("sec-type")
        label, title, label_title_raw = cls._get_label_and_title(section)
        content_raw = cls._get_raw_content(section)
        sections = [
            cls.from_xml_element(sec_elem) for sec_elem in section.findall("sec")
        ]
        return cls(
            sec_type=sec_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            sections=sections,
        )

    @classmethod
    def from_plone(cls, plone_section: object) -> Section:
        if getattr(plone_section, "portal_type", None) != "Section":
            raise ValueError("Provided object is not a Section")
        sec_type = getattr(plone_section, "sec_type", None)
        label = getattr(plone_section, "label", None)
        title = getattr(plone_section, "title", None)
        label_title_raw = getattr(plone_section, "label_title_raw", "")
        content_raw = getattr(plone_section, "content_raw", None)
        sections = []
        for sec in plone_section.restrictedTraverse("contentlisting")():
            sec = sec.getObject()
            if getattr(sec, "portal_type", None) == "Section":
                sections.append(cls.from_plone(sec))
        return cls(
            sec_type=sec_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            sections=sections,
        )


class AppendixGroup(GeneralSection):
    appendixes: list[Appendix]

    def __init__(
        self,
        sec_type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        appendixes: list[Appendix],
    ):
        super().__init__(
            sec_type=sec_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.appendixes = appendixes

    @classmethod
    def from_xml_element(cls, app_group: ET.Element) -> AppendixGroup:
        content_type = app_group.attrib.get("content-type")
        label, title, label_title_raw = cls._get_label_and_title(app_group)
        content_raw = cls._get_raw_content(app_group)
        appendixes = [
            Appendix.from_xml_element(app_elem) for app_elem in app_group.findall("app")
        ]
        return cls(
            sec_type=content_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            appendixes=appendixes,
        )

    @classmethod
    def from_plone(cls, plone_app_group: object) -> AppendixGroup:
        if getattr(plone_app_group, "portal_type", None) != "AppendixGroup":
            raise ValueError("Provided object is not an AppendixGroup")
        content_type = getattr(plone_app_group, "sec_type", None)
        label = getattr(plone_app_group, "label", None)
        title = getattr(plone_app_group, "title", None)
        label_title_raw = getattr(plone_app_group, "label_title_raw", "")
        content_raw = getattr(plone_app_group, "content_raw", None)
        appendixes = []
        for app in plone_app_group.restrictedTraverse("contentlisting")():
            app = app.getObject()
            if getattr(app, "portal_type", None) == "Appendix":
                appendixes.append(Appendix.from_plone(app))
        return cls(
            sec_type=content_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            appendixes=appendixes,
        )


class Appendix(GeneralSection):
    sections: list[Section]

    def __init__(
        self,
        sec_type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        sections: list[Section],
    ):
        super().__init__(
            sec_type=sec_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.sections = sections

    @classmethod
    def from_xml_element(cls, app: ET.Element) -> Appendix:
        app_type = app.attrib.get("app-type")
        label, title, label_title_raw = cls._get_label_and_title(app)
        content_raw = cls._get_raw_content(app)
        sections = [
            Section.from_xml_element(sec_elem) for sec_elem in app.findall("sec")
        ]
        return cls(
            sec_type=app_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            sections=sections,
        )

    @classmethod
    def from_plone(cls, plone_appendix: object) -> Appendix:
        if getattr(plone_appendix, "portal_type", None) != "Appendix":
            raise ValueError("Provided object is not an Appendix")
        app_type = getattr(plone_appendix, "sec_type", None)
        label = getattr(plone_appendix, "label", None)
        title = getattr(plone_appendix, "title", None)
        label_title_raw = getattr(plone_appendix, "label_title_raw", "")
        content_raw = getattr(plone_appendix, "content_raw", None)
        sections = []
        for sec in plone_appendix.restrictedTraverse("contentlisting")():
            sec = sec.getObject()
            if getattr(sec, "portal_type", None) == "Section":
                sections.append(Section.from_plone(sec))
        return cls(
            sec_type=app_type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            sections=sections,
        )

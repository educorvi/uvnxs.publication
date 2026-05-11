from __future__ import annotations
import os
import xml.etree.ElementTree as ET
import xmlschema


class JATSDocument:
    article: Article

    def __init__(self, article: Article):
        self.article = article

    @classmethod
    def from_xml(cls, xml_path: str, xsd_path: str | None) -> JATSDocument:
        if not cls._file_exists(xml_path):
            raise FileNotFoundError(f"XML file not found: {xml_path}")
        if xsd_path is not None:
            if not cls._file_exists(xsd_path):
                raise FileNotFoundError(f"XSD file not found: {xsd_path}")
            if not cls._validate_xml(xml_path, xsd_path):
                raise ValueError(
                    f"XML file is not valid according to the XSD: {xml_path}"
                )

        tree = ET.parse(xml_path)
        root = tree.getroot()
        if root.tag != "article":
            raise ValueError(f"Expected root element 'article', got '{root.tag}'")
        article = Article.from_xml_element(root)
        return cls(article=article)

    @staticmethod
    def _file_exists(file_path: str) -> bool:
        return os.path.isfile(file_path)

    @staticmethod
    def _validate_xml(xml_path: str, xsd_path: str) -> bool:
        schema = xmlschema.XMLSchema(xsd_path)
        return schema.is_valid(xml_path)


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


class Front:
    # TODO

    def __init__(self):
        pass

    @classmethod
    def from_xml_element(cls, element: ET.Element) -> Front:
        return cls()


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


class GeneralSection:
    type: str | None
    label: str | None
    title: str | None
    label_title_raw: str
    content_raw: str | None

    def __init__(
        self,
        type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
    ):
        self.type = type
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
            ET.tostring(label_element, encoding="unicode", method="xml")
            if label_element is not None
            else ""
        )
        title_element = section.find("title")
        title_string = (
            ET.tostring(title_element, encoding="unicode", method="xml")
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
        for elem in section:
            if elem.tag in ["label", "title"]:
                continue
            if elem.tag in ["sec", "app"]:
                break
            result += ET.tostring(elem, encoding="unicode", method="xml")
        if result == "":
            return None
        return result


class Section(GeneralSection):
    sections: list[Section]

    def __init__(
        self,
        type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        sections: list[Section],
    ):
        super().__init__(
            type=type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.sections = sections

    @classmethod
    def from_xml_element(cls, section: ET.Element) -> Section:
        type = section.attrib.get("sec-type")
        label, title, label_title_raw = cls._get_label_and_title(section)
        content_raw = cls._get_raw_content(section)
        sections = [
            cls.from_xml_element(sec_elem) for sec_elem in section.findall("sec")
        ]
        return cls(
            type=type,
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
        type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        appendixes: list[Appendix],
    ):
        super().__init__(
            type=type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.appendixes = appendixes

    @classmethod
    def from_xml_element(cls, app_group: ET.Element) -> AppendixGroup:
        type = app_group.attrib.get("content-type")
        label, title, label_title_raw = cls._get_label_and_title(app_group)
        content_raw = cls._get_raw_content(app_group)
        appendixes = [
            Appendix.from_xml_element(app_elem) for app_elem in app_group.findall("app")
        ]
        return cls(
            type=type,
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
        type: str | None,
        label: str | None,
        title: str | None,
        label_title_raw: str,
        content_raw: str | None,
        sections: list[Section],
    ):
        super().__init__(
            type=type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
        )
        self.sections = sections

    @classmethod
    def from_xml_element(cls, app: ET.Element) -> Appendix:
        type = app.attrib.get("app-type")
        label, title, label_title_raw = cls._get_label_and_title(app)
        content_raw = cls._get_raw_content(app)
        sections = [
            Section.from_xml_element(sec_elem) for sec_elem in app.findall("sec")
        ]
        return cls(
            type=type,
            label=label,
            title=title,
            label_title_raw=label_title_raw,
            content_raw=content_raw,
            sections=sections,
        )

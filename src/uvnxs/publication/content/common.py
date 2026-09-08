from plone.autoform import directives as form
from plone.supermodel import model
from uvnxs.publication import _
from uvnxs.publication.widgets.xml_editor import XmlEditorFieldWidget
from zope import schema


_LABEL_TITLE_RAW_DEFAULT = """    <label xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink">
        LABEL
    </label>
    <title xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink">
        <named-content content-type="span" specific-use="keyword">
            TITLE
        </named-content>
    </title>"""


class ICommon(model.Schema):
    """Marker interface and Dexterity Python Schema for Common"""

    title = schema.TextLine(
        title=_("Title"),
        description=_(
            "The title is used to generate an ID. Once the ID is generated, the title can be changed without changing the ID. The title is not used for display purposes."  # noqa: E501
        ),
        required=True,
    )


class IGeneralSection(model.Schema):
    """Marker interface and Dexterity Python Schema for GeneralSection"""

    sec_type = schema.TextLine(
        title=_("Type"),
        description=_(
            "The type of the section, equals to sec-type, app-type or content-type in the XML"  # noqa: E501
        ),
        required=False,
    )

    title = schema.TextLine(
        title=_("Title"),
        description=_("The title is only used to generate an ID. Once the ID is generated, the title can be changed without changing the ID. The title is not used for display purposes. For changing the displayed title, use the label and title xml field."), # noqa: E501
        required=False,
    )

    label_title_raw = schema.Text(
        title=_("Label and Title Raw"),
        description=_("The XML content for the label and title of the section."),
        required=True,
        default=_LABEL_TITLE_RAW_DEFAULT,
    )

    content_raw = schema.Text(
        title=_("Content"),
        description=_("The content of the section, equals to content in the XML"),
        required=False,
    )

    form.widget(content_raw=XmlEditorFieldWidget, label_title_raw=XmlEditorFieldWidget)

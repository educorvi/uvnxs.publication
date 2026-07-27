from plone.autoform import directives as form
from plone.supermodel import model
from uvnxs.publication import _
from uvnxs.publication.widgets.xml_editor import XmlEditorFieldWidget
from zope import schema


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
        title="Type",
        description="The type of the section, equals to sec-type, app-type or content-type in the XML",  # noqa: E501
        required=False,
    )

    label = schema.TextLine(
        title="Label",
        description="The label of the section, equals to label in the XML",
        required=False,
    )

    title = schema.TextLine(
        title="Title",
        description="The title of the section, equals to title in the XML",
        required=False,
    )

    label_title_raw = schema.Text(
        title="Label and Title Raw",
        description="Is generated out of label and / or title. Do not modify manually.",
        required=True,
    )

    content_raw = schema.Text(
        title="Content",
        description="The content of the section, equals to content in the XML",
        required=False,
    )

    form.widget(content_raw=XmlEditorFieldWidget, label_title_raw=XmlEditorFieldWidget)

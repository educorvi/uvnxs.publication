from plone.autoform import directives as form
from plone.dexterity.content import Container
from uvnxs.publication import _
from uvnxs.publication.content.common import ICommon
from uvnxs.publication.widgets.xml_editor import XmlEditorFieldWidget
from zope import schema
from zope.interface import implementer


class IFront(ICommon):
    """Marker interface and Dexterity Python Schema for Front"""

    content_raw = schema.Text(
        title=_("Raw content"),
        description=_("The raw XML content of the Front section."),
        required=False,
    )
    form.widget(content_raw=XmlEditorFieldWidget)


@implementer(IFront)
class Front(Container):
    """Content-type class for IFront"""

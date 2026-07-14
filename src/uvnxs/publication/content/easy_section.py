# from plone.app.textfield import RichText
# from plone.autoform import directives
from plone.app.textfield import RichText
from plone.dexterity.content import Container
from plone.supermodel import model
from uvnxs.publication import _
from zope import schema
from zope.interface import implementer


class IEasySection(model.Schema):
    """Marker interface and Dexterity Python Schema for EasySection"""

    label = schema.TextLine(
        title=_("Label"),
        description=_("The label of the section, i.e. 'III'"),
        required=False,
    )

    title = schema.TextLine(
        title=_("Title"),
        description=_("The title of the section"),
        required=False,
    )

    content = RichText(
        title=_("Content"),
        description=_("The content of the section"),
        default_mime_type="text/html",
        output_mime_type="text/x-html-safe",
    )


@implementer(IEasySection)
class EasySection(Container):
    """Content-type class for IEasySection"""

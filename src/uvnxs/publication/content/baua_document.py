from plone.dexterity.content import Container
from plone.namedfile.field import NamedBlobFile
from uvnxs.publication.content.common import ICommon
from zope.interface import implementer
from zope import schema

from uvnxs.publication import _


class IBauaDocument(ICommon):
    """Marker interface and Dexterity Python Schema for BauaDocument"""

    file = NamedBlobFile(
        title=_("File"),
        required=True,
    )

    subtitle = schema.TextLine(
        title=_("Subtitle"),
        required=False,
    )

    additional_information = schema.Text(
        title=_("Additional Information"),
        required=False,
    )

    original_url = schema.URI(
        title=_("Original URL"),
        required=False,
    )


@implementer(IBauaDocument)
class BauaDocument(Container):
    """Content-type class for IBauaDocument"""

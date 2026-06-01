from plone.dexterity.content import Container
from zope import schema
from zope.interface import implementer

from uvnxs.publication import _
from uvnxs.publication.content.common import ICommon


class IFront(ICommon):
    """Marker interface and Dexterity Python Schema for Front"""

    content_raw = schema.Text(
        title=_("Raw content"),
        description=_("The raw XML content of the Front section."),
        required=False,
    )


@implementer(IFront)
class Front(Container):
    """Content-type class for IFront"""

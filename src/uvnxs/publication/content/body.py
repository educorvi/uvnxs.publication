from plone.dexterity.content import Container
from uvnxs.publication.content.common import ICommon
from zope.interface import implementer


class IBody(ICommon):
    """Marker interface and Dexterity Python Schema for Body"""


@implementer(IBody)
class Body(Container):
    """Content-type class for IBody"""

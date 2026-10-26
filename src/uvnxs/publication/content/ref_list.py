from plone.dexterity.content import Container
from uvnxs.publication.content.common import ICommonSection
from zope.interface import implementer


class IRefList(ICommonSection):
    """Marker interface and Dexterity Python Schema for RefList"""


@implementer(IRefList)
class RefList(Container):
    """Content-type class for IRefList"""

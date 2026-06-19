from plone.dexterity.content import Container
from uvnxs.publication.content.common import IGeneralSection
from zope.interface import implementer


class IAppendixGroup(IGeneralSection):
    """Marker interface and Dexterity Python Schema for AppendixGroup"""


@implementer(IAppendixGroup)
class AppendixGroup(Container):
    """Content-type class for IAppendixGroup"""

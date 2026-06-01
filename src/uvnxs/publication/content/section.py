from plone.dexterity.content import Container
from zope.interface import implementer

from uvnxs.publication.content.common import IGeneralSection


class ISection(IGeneralSection):
    """Marker interface and Dexterity Python Schema for Section"""


@implementer(ISection)
class Section(Container):
    """Content-type class for ISection"""

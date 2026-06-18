from plone.dexterity.content import Container
from uvnxs.publication.content.common import IGeneralSection
from zope.interface import implementer


class ISection(IGeneralSection):
    """Marker interface and Dexterity Python Schema for Section"""


@implementer(ISection)
class Section(Container):
    """Content-type class for ISection"""

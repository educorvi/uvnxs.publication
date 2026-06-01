from plone.dexterity.content import Container
from zope.interface import implementer

from uvnxs.publication.content.common import IGeneralSection


class IAppendix(IGeneralSection):
    """Marker interface and Dexterity Python Schema for Appendix"""


@implementer(IAppendix)
class Appendix(Container):
    """Content-type class for IAppendix"""

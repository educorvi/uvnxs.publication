from plone.dexterity.content import Container
from uvnxs.publication.content.common import IGeneralSection
from zope.interface import implementer


class IAppendix(IGeneralSection):
    """Marker interface and Dexterity Python Schema for Appendix"""


@implementer(IAppendix)
class Appendix(Container):
    """Content-type class for IAppendix"""

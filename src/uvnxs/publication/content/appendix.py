from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _
from uvnxs.publication.content.common import IGeneralSection


class IAppendix(IGeneralSection):
    """Marker interface and Dexterity Python Schema for Appendix"""


@implementer(IAppendix)
class Appendix(Container):
    """Content-type class for IAppendix"""

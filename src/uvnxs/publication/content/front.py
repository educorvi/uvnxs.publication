from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _


class IFront(ICommon):
    """Marker interface and Dexterity Python Schema for Front"""


@implementer(IFront)
class Front(Container):
    """Content-type class for IFront"""

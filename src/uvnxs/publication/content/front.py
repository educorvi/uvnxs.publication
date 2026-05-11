from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _
from uvnxs.publication.content.common import ICommon


class IFront(ICommon):
    """Marker interface and Dexterity Python Schema for Front"""


@implementer(IFront)
class Front(Container):
    """Content-type class for IFront"""

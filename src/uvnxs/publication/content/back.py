from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _


class IBack(ICommon):
    """Marker interface and Dexterity Python Schema for Back"""


@implementer(IBack)
class Back(Container):
    """Content-type class for IBack"""

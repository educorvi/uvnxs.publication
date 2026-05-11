from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _
from uvnxs.publication.content.common import ICommon


class IBody(ICommon):
    """Marker interface and Dexterity Python Schema for Body"""


@implementer(IBody)
class Body(Container):
    """Content-type class for IBody"""

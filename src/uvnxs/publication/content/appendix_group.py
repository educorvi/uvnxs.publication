from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _
from uvnxs.publication.content.common import IGeneralSection


class IAppendixGroup(IGeneralSection):
    """Marker interface and Dexterity Python Schema for AppendixGroup"""


@implementer(IAppendixGroup)
class AppendixGroup(Container):
    """Content-type class for IAppendixGroup"""

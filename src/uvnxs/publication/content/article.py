from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer

from uvnxs.publication import _


class IArticle(ICommon):
    """Marker interface and Dexterity Python Schema for Article"""


@implementer(IArticle)
class Article(Container):
    """Content-type class for IArticle"""

from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer


class IEasySection(model.Schema):
    """Marker interface and Dexterity Python Schema for EasySection"""


@implementer(IEasySection)
class EasySection(Container):
    """Content-type class for IEasySection"""

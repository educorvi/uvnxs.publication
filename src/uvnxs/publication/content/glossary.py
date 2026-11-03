from plone.dexterity.content import Container
from uvnxs.publication.content.common import ICommonSection
from zope.interface import implementer


class IGlossary(ICommonSection):
    """Marker interface and Dexterity Python Schema for Glossary"""


@implementer(IGlossary)
class Glossary(Container):
    """Content-type class for IGlossary"""

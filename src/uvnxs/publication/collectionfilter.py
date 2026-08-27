from collective.collectionfilter.interfaces import IGroupByCriteria
from collective.collectionfilter.interfaces import IGroupByModifier
from zope.component import adapter
from zope.interface import implementer


@implementer(IGroupByModifier)
@adapter(IGroupByCriteria)
def groupby_modifier(groupby):
    groupby._groupby["fachbereiche"] = {
        "index": "fachbereiche",
        "metadata": "fachbereiche",
        "display_modifier": lambda value, index: value,
    }

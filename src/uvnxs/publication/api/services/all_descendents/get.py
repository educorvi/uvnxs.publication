from plone import api
from plone.restapi.interfaces import IExpandableElement
from plone.restapi.interfaces import ISerializeToJson
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.services import Service
from zope.component import adapter
from zope.component import getMultiAdapter
from zope.interface import Interface
from zope.interface import implementer


@implementer(IExpandableElement)
@adapter(Interface, Interface)
class AllDescendents(object):

    def __init__(self, context, request):
        self.context = context.aq_explicit
        self.request = request

    def __call__(self, expand=False):
        result = {
            'all_descendents': {
                '@id': f'{self.context.absolute_url()}/@all_descendents',
            },
        }
        if not expand:
            return result

        context_path = "/".join(self.context.getPhysicalPath())
        brains = api.content.find(
            path={"query": context_path, "depth": -1},
            sort_on="getObjPositionInParent",
        )

        items = []
        items_by_path = {}
        summaries_by_path = {}
        for brain in brains:
            path = brain.getPath()
            if path == context_path:
                continue

            summary = getMultiAdapter(
                (brain, self.request), ISerializeToJsonSummary
            )()
            item = getMultiAdapter(
                (brain.getObject(), self.request), ISerializeToJson
            )()
            item["children"] = []
            items.append(item)
            items_by_path[path] = item
            summaries_by_path[path] = summary

        for path in items_by_path:
            parent_path = path.rpartition("/")[0]
            parent = items_by_path.get(parent_path)
            if parent is not None:
                parent["children"].append(summaries_by_path[path])

        result["all_descendents"]["items"] = items
        return result


class AllDescendentsGet(Service):

    def reply(self):
        service_factory = AllDescendents(self.context, self.request)
        return service_factory(expand=True)['all_descendents']

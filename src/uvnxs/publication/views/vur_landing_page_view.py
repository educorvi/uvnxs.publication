from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface


class IVuRLandingPageView(Interface):
    """Marker Interface for VuR Landing Page View"""


@implementer(IVuRLandingPageView)
class VuRLandingPageView(BrowserView):
    def __call__(self):
        rubriken = [
            "Vorschriften",
            "Regeln",
            "Informationen",
            "Grundsätze",
            "Fachbereich AKTUELL",
        ]
        rubriken = dict.fromkeys(rubriken)
        for child in self.context.restrictedTraverse("@@contentlisting")():
            if child.portal_type != "Folder":
                continue
            title = child.title
            if title in rubriken and rubriken[title] is None:
                rubriken[title] = {
                    "title": title,
                    "description": child.description,
                    "url": child.getObject().absolute_url(),
                    "count": len(
                        child.getObject().restrictedTraverse("@@contentlisting")()
                    ),
                }
        self.rubriken = list(filter(lambda x: x is not None, rubriken.values()))
        return self.index()

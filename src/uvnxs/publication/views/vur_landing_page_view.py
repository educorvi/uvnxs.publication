from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface


class IVuRLandingPageView(Interface):
    """Marker Interface for VuR Landing Page View"""


@implementer(IVuRLandingPageView)
class VuRLandingPageView(BrowserView):
    def __call__(self):
        rubriken = []
        for relation in self.context.rubriken or []:
            folder = relation.to_object
            if folder is None:
                continue
            rubriken.append(
                {
                    "title": folder.Title(),
                    "description": folder.Description(),
                    "url": folder.absolute_url(),
                    "count": len(folder.restrictedTraverse("@@contentlisting")()),
                }
            )
        self.rubriken = rubriken
        return self.index()

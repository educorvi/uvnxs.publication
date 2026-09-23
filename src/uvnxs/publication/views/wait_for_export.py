# from uvnxs.publication import _
from Products.Five.browser import BrowserView
from zope.interface import implementer
from zope.interface import Interface


# from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile


class IWaitForExport(Interface):
    """Marker Interface for IWaitForExport"""


@implementer(IWaitForExport)
class WaitForExport(BrowserView):
    # If you want to define a template here, please remove the template from
    # the configure.zcml registration of this view.
    # template = ViewPageTemplateFile('wait_for_export.pt')

    def __call__(self):
        # Implement your own actions:
        return self.index()

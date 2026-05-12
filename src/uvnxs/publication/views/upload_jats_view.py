from plone.protect.interfaces import IDisableCSRFProtection
from Products.Five.browser import BrowserView
from Products.statusmessages.interfaces import IStatusMessage
from uvnxs.publication import _
from uvnxs.publication.import_models import JATSDocumentPloneImport
from uvnxs.publication.jats_models import JATSDocument
from zope.interface import alsoProvides
from zope.interface import implementer
from zope.interface import Interface


class IUploadJatsView(Interface):
    """Marker Interface for IUploadJatsView"""


@implementer(IUploadJatsView)
class UploadJatsView(BrowserView):
    def __call__(self):
        request = self.request
        alsoProvides(request, IDisableCSRFProtection)
        if request.method == "POST" and "jats_file" in request.form:
            file_upload = request.form["jats_file"]
            jats_name = (
                request.form["jats_name"]
                if "jats_name" in request.form
                else getattr(file_upload, "filename", "uploaded_jats").replace(
                    ".xml", ""
                )
            )
            if hasattr(file_upload, "read"):
                try:
                    xml_content = file_upload.read()
                    if isinstance(xml_content, bytes):
                        xml_content = xml_content.decode("utf-8")

                    # TODO insert xsd_path
                    jats = JATSDocument.from_xml(xml_content, xsd_path=None)
                    success, message = self.import_jats(jats, jats_name)
                    if success:
                        IStatusMessage(request).addStatusMessage(_(message), "info")
                    else:
                        IStatusMessage(request).addStatusMessage(_(message), "error")
                except Exception as e:
                    IStatusMessage(request).addStatusMessage(
                        _("Error: Invalid XML syntax: {0}".format(e)), "error"
                    )
            else:
                IStatusMessage(request).addStatusMessage(
                    _("No file uploaded or file is invalid."), "error"
                )
        return self.index()

    def import_jats(self, jats: JATSDocument, jats_name: str) -> tuple[bool, str]:
        """
        Creates Plone objects out of the JATS XML content. Returns a tuple of (success, message).
        If success is True, message contains a success message. If success is False, message contains an error message.
        """
        jats_import = JATSDocumentPloneImport(jats, jats_name, self.context)
        success, message = jats_import.import_jats()
        return success, message

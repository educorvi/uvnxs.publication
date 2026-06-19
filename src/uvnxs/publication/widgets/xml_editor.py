from .. import _
from uvnxs.publication.interfaces import IXmlEditorWidget
from z3c.form.browser.widget import HTMLTextAreaWidget
from z3c.form.widget import FieldWidget
from z3c.form.widget import Widget
from zope.interface import implementer


@implementer(IXmlEditorWidget)
class XmlEditorWidget(HTMLTextAreaWidget, Widget):
    klass = "xml-editor"
    formatButtonText = _("Reformat")


def XmlEditorFieldWidget(field, request):
    return FieldWidget(field, XmlEditorWidget(request))

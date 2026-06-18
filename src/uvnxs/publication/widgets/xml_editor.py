from z3c.form.browser.widget import HTMLTextAreaWidget
from z3c.form.widget import FieldWidget, Widget
from zope.interface import implementer

from uvnxs.publication.interfaces import IXmlEditorWidget


@implementer(IXmlEditorWidget)
class XmlEditorWidget(HTMLTextAreaWidget, Widget):
    klass = "xml-editor"

def XmlEditorFieldWidget(field, request):
    return FieldWidget(field, XmlEditorWidget(request))

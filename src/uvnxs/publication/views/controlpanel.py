from plone.app.registry.browser.controlpanel import ControlPanelFormWrapper
from plone.app.registry.browser.controlpanel import RegistryEditForm
from plone.z3cform import layout
from uvnxs.publication import _
from uvnxs.publication.interfaces import IUvnxsPublicationSettings


class UvnxsPublicationSettingsEditForm(RegistryEditForm):
    schema = IUvnxsPublicationSettings
    schema_prefix = "uvnxs.publication"
    label = _(
        "label_uvnxs_publication_settings", default="UVNXS Publication Einstellungen"
    )


UvnxsPublicationSettingsView = layout.wrap_form(
    UvnxsPublicationSettingsEditForm,
    ControlPanelFormWrapper,
)

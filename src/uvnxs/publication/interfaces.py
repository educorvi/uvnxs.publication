"""Module where all interfaces, events and exceptions live."""
from plone.app.caching.operations import default
from uvnxs.publication import _
from zope import schema
from zope.interface import Interface
from zope.publisher.interfaces.browser import IDefaultBrowserLayer


class IBrowserLayer(IDefaultBrowserLayer):
    """Marker interface that defines a browser layer."""


class IUvnxsPublicationSettings(Interface):
    """Settings for uvnxs.publication stored in the registry."""

    base_url = schema.URI(
        title=_(
            "label_jats_hub_base_url",
            default="Base URL des JATS ImportExport Hub",
        ),
        description=_(
            "help_jats_hub_base_url",
            default="Basis-URL des JATS ImportExport Hub, z.B. https://hub.example.com",
        ),
        required=True,
        default="http://localhost:8000",
    )

    use_api_key = schema.Bool(
        title=_("label_use_api_key", default="API Key verwenden"),
        description=_("help_use_api_key", default="API Key für den JATS ImportExport Hub verwenden"),
        required=False,
        default=False
    )

    api_key = schema.TextLine(
        title=_("label_api_key", default="API Key"),
        description=_("help_api_key", default="API Key für den JATS ImportExport Hub"),
        required=False,
        default="abc123"
    )

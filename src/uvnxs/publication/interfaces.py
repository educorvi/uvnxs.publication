"""Module where all interfaces, events and exceptions live."""

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
        required=False,
    )

from plone.base.interfaces.installable import INonInstallable
from zope.interface import implementer


@implementer(INonInstallable)
class HiddenProfiles:
    def getNonInstallableProfiles(self):
        """Hide uninstall and upgrade profiles from site-creation and quickinstaller."""
        return [
            "uvnxs.publication:uninstall",
            "uvnxs.publication:to_1017",
            "uvnxs.publication:to_1018",
            "uvnxs.publication:to_1019",
            "uvnxs.publication:to_1020",
            "uvnxs.publication:to_1021",
        ]

    def getNonInstallableProducts(self):
        """Hide the upgrades package from site-creation and quickinstaller."""
        return [
            "uvnxs.publication.upgrades",
        ]

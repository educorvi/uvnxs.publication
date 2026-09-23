from uvnxs.publication import PACKAGE_NAME


class TestSetupInstall:
    def test_addon_installed(self, installer):
        """Test if uvnxs.publication is installed."""
        assert installer.is_product_installed(PACKAGE_NAME) is True

    def test_browserlayer(self, browser_layers):
        """Test that IBrowserLayer is registered."""
        from uvnxs.publication.interfaces import IBrowserLayer

        assert IBrowserLayer in browser_layers

from plone.app.layout.viewlets.common import ViewletBase


class HiddenViewlet(ViewletBase):
    def render(self):
        return ""

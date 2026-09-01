from plone.app.z3cform.widgets.relateditems import RelatedItemsFieldWidget
from plone.autoform import directives
from plone.dexterity.content import Container

# from plone.namedfile import field as namedfile
from plone.supermodel import model
from uvnxs.publication import _
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList

# from plone.supermodel.directives import fieldset
# from z3c.form.browser.radio import RadioFieldWidget
from zope.interface import implementer


class IVurLandingPage(model.Schema):
    """Marker interface and Dexterity Python Schema for VurLandingPage"""

    directives.widget(
        "rubriken",
        RelatedItemsFieldWidget,
        pattern_options={"selectableTypes": ["Folder"]},
    )
    rubriken = RelationList(
        title=_("Rubriken"),
        description=_("Select the folders shown on the landing page."),
        required=False,
        default=[],
        value_type=RelationChoice(
            vocabulary="plone.app.vocabularies.Catalog",
        ),
    )
    # If you want, you can load a xml model created TTW here
    # and customize it in Python:

    # model.load('vur_landing_page.xml')

    # add the following line to make your field searchable in
    # the default SearchableText index
    #
    # searchable('fieldname')

    # directives.widget(level=RadioFieldWidget)
    # level = schema.Choice(
    #     title=_('Sponsoring Level'),
    #     vocabulary=LevelVocabulary,
    #     required=True
    # )

    # text = RichText(
    #     title=_('Text'),
    #     required=False
    # )

    # url = schema.URI(
    #     title=_('Link'),
    #     required=False
    # )

    # fieldset('Images', fields=['logo', 'advertisement'])
    # logo = namedfile.NamedBlobImage(
    #     title=_('Logo'),
    #     required=False,
    # )

    # advertisement = namedfile.NamedBlobImage(
    #     title=_('Advertisement (Gold-sponsors and above)'),
    #     required=False,
    # )

    # directives.read_permission(notes='cmf.ManagePortal')
    # directives.write_permission(notes='cmf.ManagePortal')
    # notes = RichText(
    #     title=_('Secret Notes (only for site-admins)'),
    #     required=False
    # )


@implementer(IVurLandingPage)
class VurLandingPage(Container):
    """Content-type class for IVurLandingPage"""

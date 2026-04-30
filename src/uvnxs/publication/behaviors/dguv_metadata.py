from plone import schema
from plone.autoform.interfaces import IFormFieldProvider
from plone.base.utils import safe_hasattr
from plone.supermodel import model
from zope.component import adapter
from zope.interface import Interface
from zope.interface import implementer
from zope.interface import provider


class IDguvMetadataMarker(Interface):
    pass


@provider(IFormFieldProvider)
class IDguvMetadata(model.Schema):
    model.fieldset(
        "dguv",
        label="DGUV Metadaten",
        fields=(
            "dguv_beschreibender_typ",
            "dguv_bisherige_bestellnummer",
            "dguv_webcode",
            "dguv_organisationseinheit",
            "dguv_fachbereich",
            "dguv_sachgebiet",
            "dguv_bildnachweis",
            "dguv_ueberschriften_mit_nummerierung",
        ),
    )

    dguv_beschreibender_typ = schema.TextLine(
        title="Beschreibender Typ",
        required=False,
    )

    dguv_bisherige_bestellnummer = schema.TextLine(
        title="Bisherige Bestellnummer",
        required=False,
    )

    dguv_webcode = schema.TextLine(
        title="Webcode",
        required=False,
    )

    dguv_organisationseinheit = schema.TextLine(
        title="Organisationseinheit",
        required=False,
    )

    dguv_fachbereich = schema.TextLine(
        title="Fachbereich",
        required=False,
    )

    dguv_sachgebiet = schema.TextLine(
        title="Sachgebiet",
        required=False,
    )

    dguv_bildnachweis = schema.TextLine(
        title="Bildnachweis",
        required=False,
    )

    dguv_ueberschriften_mit_nummerierung = schema.Bool(
        title="Überschriften mit Nummerierung",
        required=False,
        default=False,
    )


@implementer(IDguvMetadata)
@adapter(IDguvMetadataMarker)
class DguvMetadata:
    def __init__(self, context):
        self.context = context

    @property
    def dguv_beschreibender_typ(self):
        if safe_hasattr(self.context, "dguv_beschreibender_typ"):
            return self.context.dguv_beschreibender_typ
        return None

    @dguv_beschreibender_typ.setter
    def dguv_beschreibender_typ(self, value):
        self.context.dguv_beschreibender_typ = value

    @property
    def dguv_bisherige_bestellnummer(self):
        if safe_hasattr(self.context, "dguv_bisherige_bestellnummer"):
            return self.context.dguv_bisherige_bestellnummer
        return None

    @dguv_bisherige_bestellnummer.setter
    def dguv_bisherige_bestellnummer(self, value):
        self.context.dguv_bisherige_bestellnummer = value

    @property
    def dguv_webcode(self):
        if safe_hasattr(self.context, "dguv_webcode"):
            return self.context.dguv_webcode
        return None

    @dguv_webcode.setter
    def dguv_webcode(self, value):
        self.context.dguv_webcode = value

    @property
    def dguv_organisationseinheit(self):
        if safe_hasattr(self.context, "dguv_organisationseinheit"):
            return self.context.dguv_organisationseinheit
        return None

    @dguv_organisationseinheit.setter
    def dguv_organisationseinheit(self, value):
        self.context.dguv_organisationseinheit = value

    @property
    def dguv_fachbereich(self):
        if safe_hasattr(self.context, "dguv_fachbereich"):
            return self.context.dguv_fachbereich
        return None

    @dguv_fachbereich.setter
    def dguv_fachbereich(self, value):
        self.context.dguv_fachbereich = value

    @property
    def dguv_sachgebiet(self):
        if safe_hasattr(self.context, "dguv_sachgebiet"):
            return self.context.dguv_sachgebiet
        return None

    @dguv_sachgebiet.setter
    def dguv_sachgebiet(self, value):
        self.context.dguv_sachgebiet = value

    @property
    def dguv_bildnachweis(self):
        if safe_hasattr(self.context, "dguv_bildnachweis"):
            return self.context.dguv_bildnachweis
        return None

    @dguv_bildnachweis.setter
    def dguv_bildnachweis(self, value):
        self.context.dguv_bildnachweis = value

    @property
    def dguv_ueberschriften_mit_nummerierung(self):
        if safe_hasattr(self.context, "dguv_ueberschriften_mit_nummerierung"):
            return self.context.dguv_ueberschriften_mit_nummerierung
        return False

    @dguv_ueberschriften_mit_nummerierung.setter
    def dguv_ueberschriften_mit_nummerierung(self, value):
        self.context.dguv_ueberschriften_mit_nummerierung = value

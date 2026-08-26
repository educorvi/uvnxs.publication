from plone.autoform import directives as form
from plone.dexterity.content import Container
from plone.supermodel import model
from uvnxs.publication import _
from uvnxs.publication.content.common import ICommon
from uvnxs.publication.widgets.xml_editor import XmlEditorFieldWidget
from zope import schema
from zope.interface import implementer
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary
from plone.app.dexterity import textindexer


journal_title_values = [
    ("dguv-vorschrift", "DGUV Vorschrift"),
    ("dguv-information", "DGUV Information"),
    ("dguv-regel", "DGUV Regel"),
    ("dguv-grundsatz", "DGUV Grundsatz"),
    ("fachbereich-aktuell", "Fachbereich AKTUELL"),
]
journal_title_terms = [
    SimpleTerm(value=pair[0], token=pair[0], title=pair[1])
    for pair in journal_title_values
]
journal_title_vocabulary = SimpleVocabulary(journal_title_terms)

journal_subtitle_values = [
    ("durchfuehrungsanweisung", "Durchführungsanweisung"),
    ("unfallverhuetungsvorschrift", "Unfallverhütungsvorschrift"),
    ("konkretisierende-regel", "Konkretisierende Regel"),
    ("branchenregel", "Branchenregel"),
]
journal_subtitle_terms = [
    SimpleTerm(value=pair[0], token=pair[0], title=pair[1])
    for pair in journal_subtitle_values
]
journal_subtitle_vocabulary = SimpleVocabulary(journal_subtitle_terms)


class IArticle(ICommon):
    """Marker interface and Dexterity Python Schema for Article"""

    # --- Journal Metadata (journal-meta) ---

    model.fieldset(
        "journal_meta",
        label=_("Journal Metadata"),
        fields=[
            "journal_id",
            "journal_title",
            "journal_subtitle",
            "issn",
            "publisher_name",
            "publisher_institution",
            "publisher_addr_line",
            "publisher_postal_code",
            "publisher_city",
            "publisher_phone",
            "publisher_email",
            "publisher_uri",
        ],
    )

    journal_id = schema.TextLine(
        title=_("Journal ID"),
        description=_("JATS XML: journal-id"),
        required=False,
    )

    # TODO migration?
    # journal_title = schema.Choice(
    journal_title = schema.TextLine(
        title=_("Journal Title"),
        description=_("JATS XML: journal-title-group/journal-title"),
        # vocabulary=journal_title_vocabulary,
        required=False,
    )

    # journal_subtitle = schema.Choice(
    journal_subtitle = schema.TextLine(
        title=_("Journal Subtitle"),
        description=_("JATS XML: journal-title-group/journal-subtitle"),
        # vocabulary=journal_subtitle_vocabulary,
        required=False,
    )

    issn = schema.TextLine(
        title=_("ISSN"),
        description=_("JATS XML: issn"),
        required=False,
    )

    publisher_name = schema.TextLine(
        title=_("Publisher Name"),
        description=_("JATS XML: publisher/publisher-name"),
        required=False,
    )

    publisher_institution = schema.TextLine(
        title=_("Publisher Institution"),
        description=_("JATS XML: publisher/publisher-loc/institution"),
        required=False,
    )

    publisher_addr_line = schema.TextLine(
        title=_("Publisher Address"),
        description=_("JATS XML: publisher/publisher-loc/addr-line"),
        required=False,
    )

    publisher_postal_code = schema.TextLine(
        title=_("Publisher Postal Code"),
        description=_("JATS XML: publisher/publisher-loc/postal-code"),
        required=False,
    )

    publisher_city = schema.TextLine(
        title=_("Publisher City"),
        description=_("JATS XML: publisher/publisher-loc/city"),
        required=False,
    )

    publisher_phone = schema.TextLine(
        title=_("Publisher Phone"),
        description=_("JATS XML: publisher/publisher-loc/phone"),
        required=False,
    )

    publisher_email = schema.TextLine(
        title=_("Publisher Email"),
        description=_("JATS XML: publisher/publisher-loc/email"),
        required=False,
    )

    publisher_uri = schema.TextLine(
        title=_("Publisher URI"),
        description=_("JATS XML: publisher/publisher-loc/uri"),
        required=False,
    )

    # --- Article Metadata (article-meta) ---

    model.fieldset(
        "article_meta",
        label=_("Article Metadata"),
        fields=[
            "article_id",
            "article_subtitle",
            "author_surname",
            "co_author_surname",
            "co_author_aff",
            "self_uri",
            "article_categories",
            "related_articles",
        ],
    )

    article_id = schema.TextLine(
        title=_("Article ID"),
        description=_("JATS XML: article-id (pub-id-type=publisher-id)"),
        required=False,
    )

    article_subtitle = schema.List(
        title=_("Article Subtitle"),
        description=_("JATS XML: title-group/subtitle (one per line)"),
        value_type=schema.TextLine(),
        required=False,
    )

    author_surname = schema.TextLine(
        title=_("Author Surname"),
        description=_("JATS XML: contrib (contrib-type=Autor) / name / surname"),
        required=False,
    )

    co_author_surname = schema.TextLine(
        title=_("Co-Author Surname"),
        description=_("JATS XML: contrib (contrib-type=Co-Autor) / name / surname"),
        required=False,
    )
    form.omitted("co_author_surname")

    co_author_aff = schema.TextLine(
        title=_("Co-Author Affiliation"),
        description=_("JATS XML: contrib (contrib-type=Co-Autor) / aff"),
        required=False,
    )
    form.omitted("co_author_aff")

    self_uri = schema.TextLine(
        title=_("Self URI"),
        description=_("Canonical URL. JATS XML: self-uri"),
        required=False,
    )

    article_categories = schema.Text(
        title=_("Article Categories"),
        description=_("JATS XML: article-categories"),
        required=False,
    )
    form.widget(article_categories=XmlEditorFieldWidget)
    form.omitted("article_categories")

    related_articles = schema.List(
        title=_("Related Articles"),
        description=_(
            "List of related articles (article-id values) separated by newlines. JATS XML: related-article. This list can be transformed into links to the actual plone articles via the API."  # noqa: E501
        ),
        value_type=schema.TextLine(),
        required=False,
        default=[],
    )
    form.omitted("related_articles")

    # --- Publication Dates ---

    model.fieldset(
        "pub_dates",
        label=_("Publication Dates"),
        fields=[
            "pub_date_ausgabedatum",
            "pub_date_aktualisierte_fassung",
            "history_initial_publication",
            "history_correction",
            "history_latest_version",
        ],
    )

    pub_date_ausgabedatum = schema.Date(
        title=_("Publication Date (Ausgabedatum)"),
        description=_("JATS XML: pub-date (date-type=Ausgabedatum)"),
        required=False,
    )

    pub_date_aktualisierte_fassung = schema.Date(
        title=_("Publication Date (Aktualisierte Fassung)"),
        description=_("JATS XML: pub-date (date-type=AktualisierteFassung)"),
        required=False,
    )

    history_initial_publication = schema.TextLine(
        title=_("Initial Publication Year"),
        description=_("JATS XML: history/date (date-type=initial-publication) / year"),
        required=False,
    )

    history_correction = schema.TextLine(
        title=_("Correction Year"),
        description=_("JATS XML: history/date (date-type=correction) / year"),
        required=False,
    )

    history_latest_version = schema.TextLine(
        title=_("Latest Version Year"),
        description=_("JATS XML: history/date (date-type=latest-version) / year"),
        required=False,
    )

    # --- Copyright ---

    model.fieldset(
        "copyright",
        label=_("Copyright"),
        fields=[
            "copyright_statement",
            "copyright_holder",
        ],
    )

    copyright_statement = schema.Text(
        title=_("Copyright Statement"),
        description=_("JATS XML: permissions/copyright-statement"),
        required=False,
    )

    copyright_holder = schema.TextLine(
        title=_("Copyright Holder"),
        description=_("JATS XML: permissions/copyright-holder"),
        required=False,
    )

    # --- Abstracts & Keywords ---

    # TODO translate
    model.fieldset(
        "abstracts_keywords",
        label=_("Abstracts"),
        fields=[
            "abstract_short_title",
            "abstract_short",
            "abstract_summary_title",
            "abstract_summary",
        ],
    )

    textindexer.searchable("abstract_short_title")
    abstract_short_title = schema.TextLine(
        title=_("Short Abstract Title"),
        description=_("JATS XML: abstract (abstract-type=short) / title"),
        required=False,
    )

    textindexer.searchable("abstract_short")
    abstract_short = schema.Text(
        title=_("Short Abstract"),
        description=_("JATS XML: abstract (abstract-type=short) / p"),
        required=False,
    )

    abstract_summary_title = schema.TextLine(
        title=_("Summary Abstract Title"),
        description=_("JATS XML: abstract (abstract-type=summary) / title"),
        required=False,
    )

    abstract_summary = schema.Text(
        title=_("Summary Abstract"),
        description=_("JATS XML: abstract (abstract-type=summary) / p"),
        required=False,
    )

    # --- DGUV Metadata ---

    model.fieldset(
        "dguv_meta",
        label=_("DGUV Metadata"),
        fields=[
            "beschreibender_typ",
            "bisherige_bestellnummer",
            "organisationseinheit",
            "fachbereich",
            "sachgebiet",
            "bildnachweis",
            "ueberschriften_mit_nummerierung",
        ],
    )

    beschreibender_typ = schema.TextLine(
        title=_("Beschreibender Typ"),
        description=_("Corresponds to custom-meta 'Beschreibender Typ' in JATS XML."),
        required=False,
    )

    bisherige_bestellnummer = schema.TextLine(
        title=_("Bisherige Bestellnummer"),
        description=_(
            "Corresponds to custom-meta 'Bisherige Bestellnummer' in JATS XML."
        ),
        required=False,
    )

    organisationseinheit = schema.TextLine(
        title=_("Organisationseinheit"),
        description=_("Corresponds to custom-meta 'Organisationseinheit' in JATS XML."),
        required=False,
    )

    fachbereich = schema.TextLine(
        title=_("Fachbereich"),
        description=_("Corresponds to custom-meta 'Fachbereich' in JATS XML."),
        required=False,
    )

    sachgebiet = schema.TextLine(
        title=_("Sachgebiet"),
        description=_("Corresponds to custom-meta 'Sachgebiet' in JATS XML."),
        required=False,
    )

    bildnachweis = schema.TextLine(
        title=_("Bildnachweis"),
        description=_("Corresponds to custom-meta 'Bildnachweis' in JATS XML."),
        required=False,
    )

    ueberschriften_mit_nummerierung = schema.Bool(
        title=_("Überschriften mit Nummerierung"),
        description=_(
            "Corresponds to custom-meta 'Überschriften mit Nummerierung' in JATS XML."
        ),
        required=False,
    )

    # Internal fields, not shown on add/edit forms
    form.omitted("html_content_rev")
    html_content_rev = schema.SourceText(
        title=_("HTML Content Revision"),
        description=_(
            "Stores the HTML content of the article for versioning purposes."
        ),
        required=False,
    )

    form.omitted("jats_content_rev")
    jats_content_rev = schema.SourceText(
        title=_("JATS Content Revision"),
        description=_(
            "Stores the JATS XML content of the article for versioning purposes."
        ),
        required=False,
    )


@implementer(IArticle)
class Article(Container):
    """Content-type class for IArticle"""

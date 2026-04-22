# -*- coding: utf-8 -*-
from uvnxs.publication import _
from plone import schema
from plone.autoform.interfaces import IFormFieldProvider
from plone.autoform import directives
from plone.supermodel import model
from Products.CMFPlone.utils import safe_hasattr
from zope.component import adapter
from zope.interface import Interface
from zope.interface import implementer
from zope.interface import provider


class IJatsMetadataMarker(Interface):
    pass


@provider(IFormFieldProvider)
class IJatsMetadata(model.Schema):
    """
    """

    directives.fieldset(
        "jats",
        label="JATS-Metadaten",
        fields=(
            "jats_article_id",
            "jats_doi",
            "jats_article_type",
            "jats_language",
            "jats_journal_title",
            "jats_title",
            "jats_subtitle",
            "jats_abstract",
            "jats_keywords",
            "jats_authors",
            "jats_pub_date",
            "jats_license",
            "jats_source_xml",
        ),
    )

    jats_article_id = schema.TextLine(
        title="JATS article-id",
        required=False,
    )

    jats_doi = schema.TextLine(
        title="DOI",
        required=False,
    )

    jats_article_type = schema.TextLine(
        title="Article type",
        required=False,
    )

    jats_language = schema.TextLine(
        title="Language",
        required=False,
    )

    jats_journal_title = schema.TextLine(
        title="Container / journal title",
        required=False,
    )

    jats_title = schema.TextLine(
        title="JATS title",
        required=False,
    )

    jats_subtitle = schema.TextLine(
        title="JATS subtitle",
        required=False,    
    )

    jats_abstract = schema.Text(
        title="Abstract",
        required=False,
        default="",
    )

    jats_keywords = schema.List(
        title="Keywords",
        required=False,
        value_type=schema.TextLine(),
    )

    jats_authors = schema.List(
        title="Authors",
        required=False,
        value_type=schema.TextLine(),
    )

    jats_pub_date = schema.Date(
        title="Publication date",
        required=False,
    )

    jats_license = schema.Text(
        title="License statement",
        required=False,
        default="",
    )

    jats_source_xml = schema.Text(
        title="Source XML",
        description="Optional raw XML snapshot for traceability.",
        required=False,
        default="",
    )

@implementer(IJatsMetadata)
@adapter(IJatsMetadataMarker)
class JatsMetadata(object):
    def __init__(self, context):
        self.context = context

    @property
    def jats_article_id(self):
        if safe_hasattr(self.context, "jats_article_id"):
            return self.context.jats_article_id
        return None

    @jats_article_id.setter
    def jats_article_id(self, value):
        self.context.jats_article_id = value

    @property
    def jats_doi(self):
        if safe_hasattr(self.context, "jats_doi"):
            return self.context.jats_doi
        return None

    @jats_doi.setter
    def jats_doi(self, value):
        self.context.jats_doi = value

    @property
    def jats_article_type(self):
        if safe_hasattr(self.context, "jats_article_type"):
            return self.context.jats_article_type
        return None

    @jats_article_type.setter
    def jats_article_type(self, value):
        self.context.jats_article_type = value

    @property
    def jats_language(self):
        if safe_hasattr(self.context, "jats_language"):
            return self.context.jats_language
        return None

    @jats_language.setter
    def jats_language(self, value):
        self.context.jats_language = value

    @property
    def jats_journal_title(self):
        if safe_hasattr(self.context, "jats_journal_title"):
            return self.context.jats_journal_title
        return None

    @jats_journal_title.setter
    def jats_journal_title(self, value):
        self.context.jats_journal_title = value

    @property
    def jats_title(self):
        if safe_hasattr(self.context, "jats_title"):
            return self.context.jats_title
        return None

    @jats_title.setter
    def jats_title(self, value):
        self.context.jats_title = value

    @property
    def jats_subtitle(self):
        if safe_hasattr(self.context, "jats_subtitle"):
            return self.context.jats_subtitle
        return None

    @jats_subtitle.setter
    def jats_subtitle(self, value):
        self.context.jats_subtitle = value

    @property
    def jats_abstract(self):
        if safe_hasattr(self.context, "jats_abstract"):
            return self.context.jats_abstract
        return None

    @jats_abstract.setter
    def jats_abstract(self, value):
        self.context.jats_abstract = value

    @property
    def jats_keywords(self):
        if safe_hasattr(self.context, "jats_keywords"):
            return self.context.jats_keywords
        return []

    @jats_keywords.setter
    def jats_keywords(self, value):
        self.context.jats_keywords = value

    @property
    def jats_authors(self):
        if safe_hasattr(self.context, "jats_authors"):
            return self.context.jats_authors
        return []

    @jats_authors.setter
    def jats_authors(self, value):
        self.context.jats_authors = value

    @property
    def jats_pub_date(self):
        if safe_hasattr(self.context, "jats_pub_date"):
            return self.context.jats_pub_date
        return None

    @jats_pub_date.setter
    def jats_pub_date(self, value):
        self.context.jats_pub_date = value

    @property
    def jats_license(self):
        if safe_hasattr(self.context, "jats_license"):
            return self.context.jats_license
        return None

    @jats_license.setter
    def jats_license(self, value):
        self.context.jats_license = value

    @property
    def jats_source_xml(self):
        if safe_hasattr(self.context, "jats_source_xml"):
            return self.context.jats_source_xml
        return None

    @jats_source_xml.setter
    def jats_source_xml(self, value):
        self.context.jats_source_xml = value

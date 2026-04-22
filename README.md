# Minimal-invasive JATS-Import für Plone Document

Dieses Paket erweitert den bestehenden Dexterity-Typ `Document` um ein schlankes JATS-Behavior
und liefert ein separates Python-Importskript, das eine JATS-XML-Datei einliest und per
`plone.restapi` als `Document` anlegt.

## Enthalten

- `src/collective/jatsimport/behaviors/jats.py`
  - schema-only Behavior mit wesentlichen JATS-Metadaten
- `src/collective/jatsimport/configure.zcml`
  - registriert das Behavior
- `src/collective/jatsimport/profiles/default/types/Document.xml`
  - hängt das Behavior an den bestehenden Typ `Document`
- `scripts/import_jats_via_restapi.py`
  - liest JATS ein und erstellt ein `Document` per REST API

## JATS-Felder im Behavior

Abgebildet werden bewusst nur Kernfelder, um die Invasivität gering zu halten:

- `jats_article_id`
- `jats_doi`
- `jats_article_type`
- `jats_language`
- `jats_journal_title`
- `jats_title`
- `jats_subtitle`
- `jats_abstract`
- `jats_keywords`
- `jats_authors`
- `jats_pub_date`
- `jats_license`
- `jats_source_xml`

Zusätzlich mappt das Importskript nach Plone-Standardfelder:

- `title` ← JATS article-title
- `description` ← erster Abstract-Absatz oder Untertitel
- `text` ← einfacher HTML-Body aus `body/sec`

## Installation des Add-ons

1. Paket in dein Build/Requirements aufnehmen.
2. Plone neu starten.
3. Add-on-Profil installieren.

Danach besitzt `Document` das JATS-Behavior.

## Importskript

Beispiel:

```bash
python scripts/import_jats_via_restapi.py \
  --api-base http://localhost:8080/Plone/++api++ \
  --container /import \
  --username admin \
  --password admin \
  --xml /pfad/zur/beispiel_dguv_arbeitsschutz_jats.xml
```

Alternativ mit Token:

```bash
python scripts/import_jats_via_restapi.py \
  --api-base http://localhost:8080/Plone/++api++ \
  --container /import \
  --token 'Bearer ...' \
  --xml /pfad/zur/datei.xml
```


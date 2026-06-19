# Changelog

<!--
   You should *NOT* be adding new change log entries to this file.
   You should create a file in the news directory instead.
   For helpful instructions, please see:
   https://github.com/plone/plone.releaser/blob/master/ADD-A-NEWS-ITEM.rst
-->

<!-- towncrier release notes start -->

## 1.0.0a7 (2026-06-19)


### New features:

- xml editor [#b8590ca](https://github.com/educorvi/uvnxs.publication/issues/b8590ca)


### Internal:

- pr review feedback [#5b357a4](https://github.com/educorvi/uvnxs.publication/issues/5b357a4)
- linting [#78035e3](https://github.com/educorvi/uvnxs.publication/issues/78035e3)
- translations [#e8e4df6](https://github.com/educorvi/uvnxs.publication/issues/e8e4df6)

## 1.0.0a6 (2026-06-05)


### New features:

- empty cache on update [#b1dda9b](https://github.com/educorvi/uvnxs.publication/issues/b1dda9b)

## 1.0.0a5 (2026-06-01)


### New features:

- API key support [#fff4c46](https://github.com/educorvi/uvnxs.publication/issues/fff4c46)


### Bug fixes:

- new response type [#e36624b](https://github.com/educorvi/uvnxs.publication/issues/e36624b)

## 1.0.0a4 (2026-05-29)


### New features:

- add control panel for UVNXS Publication settings [#8f606fc](https://github.com/educorvi/uvnxs.publication/issues/8f606fc)


### Bug fixes:

- update schema field type from `TextLine` to `Text` for `label_title_raw` [#dc39f17](https://github.com/educorvi/uvnxs.publication/issues/dc39f17)
- update default branch for jats-importexport client to `main` [#7585082](https://github.com/educorvi/uvnxs.publication/issues/7585082)

## 1.0.0a3 (2026-05-18)


### New features:

- add html raw view 

## 1.0.0a2 (2026-05-15)


### Bug fixes:

- fix empty metadata bug on import 

## 1.0.0a1 (2026-05-15)


### New features:

- Added German translations and updated the message catalogs for the package. 
- Added batch upload support to `upload_jats.py` and improved its progress and feedback output during imports. 
- Added extensive article and front metadata fields together with synchronization subscribers to keep related content data in sync. 
- Expanded the catalog configuration with comprehensive indexing and additional metadata columns for publication content. 


### Internal:

- Bumped the package version back to development as `1.0.0a1` after the `1.0.0a0` tag. 

## 1.0.0a0 (2026-05-12)


### Internal:

- Exclude testdata from source distribution. [#1](https://github.com/educorvi/uvnxs.publication/issues/1)

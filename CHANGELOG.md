# Changelog

<!--
   You should *NOT* be adding new change log entries to this file.
   You should create a file in the news directory instead.
   For helpful instructions, please see:
   https://github.com/plone/plone.releaser/blob/master/ADD-A-NEWS-ITEM.rst
-->

<!-- towncrier release notes start -->

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

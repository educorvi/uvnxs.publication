"""Init and utils."""

from zope.i18nmessageid import MessageFactory

import logging


__version__ = ",.dev0"

PACKAGE_NAME = "uvnxs.publication"

_ = MessageFactory(PACKAGE_NAME)

logger = logging.getLogger(PACKAGE_NAME)

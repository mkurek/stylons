"""Setup the pysencha application"""
import logging

import pylons.test

from pysencha.config.environment import load_environment
from pysencha.model.meta import Session, metadata

log = logging.getLogger(__name__)

def setup_app(command, conf, vars):
    """Place any commands to setup pysencha here"""
    # Don't reload the app if it was loaded under the testing environment
    if not pylons.test.pylonsapp:
        load_environment(conf.global_conf, conf.local_conf)
    from pysencha.model import meta
    log.info("Creating tables")
    meta.metadata.create_all(bind=meta.engine)
    log.info("Successfully setup")
    # Create the tables if they don't already exist
    #metadata.create_all(bind=Session.bind)

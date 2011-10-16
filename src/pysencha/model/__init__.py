import sqlalchemy as sa
from sqlalchemy import orm
from pysencha.model import meta , data_base

def init_model(engine):
    """Call me before using any of the tables or classes in the model."""

    sm = orm.sessionmaker(autoflush=True, autocommit=True, bind=engine)

    meta.engine = engine
    meta.Session = orm.scoped_session(sm)
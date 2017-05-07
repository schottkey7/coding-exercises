

class Base(object):
    """Base app config"""

    DEBUG = False
    TESTING = False


class Development(Base):
    """Dev app config"""

    DEBUG = True
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///hashtags.db'


class Test(Base):
    """Test app config"""

    DEBUG = False
    TESTING = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'

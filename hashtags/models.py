from app import db


class Document(db.Model):
    """Document model"""

    __tablename__ = 'Document'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)


class DocumentWords(db.Model):
    """Model for document-words association"""

    __tablename__ = 'DocumentWords'

    word = db.Column(db.String, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('Document.id'), primary_key=True)
    count = db.Column(db.Integer)


class SentenceWords(db.Model):
    """Model for sentence-words association"""

    __tablename__ = 'SentenceWords'

    word = db.Column(db.String, primary_key=True)
    sentence = db.Column(db.Text, primary_key=True)
    doc_id = db.Column(db.Integer, db.ForeignKey('Document.id'), primary_key=True)

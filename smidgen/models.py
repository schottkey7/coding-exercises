from controller import db


class Url(db.Model):

    __tablename__ = 'url'

    id = db.Column(db.Integer, primary_key=True)
    original = db.Column(db.String, nullable=False)
    shortened = db.Column(db.String, nullable=False)
    hits = db.Column(db.Integer)

    def __init__(self, original, shortened):
        self.original = original
        self.shortened = shortened
        self.hits = 0

    def __repr__(self):
        return "<original {}, shotened: {}".format(self.original, self.shortened)

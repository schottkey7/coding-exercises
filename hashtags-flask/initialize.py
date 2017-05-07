from hashtags.controller import db
from nltk import download

# drop all existing
db.drop_all()
# create the database and db tables
db.create_all()
db.session.commit()
print('[app] DB initialized')

download('punkt')
print('[app] nltk packages downloaded')

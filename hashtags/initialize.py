from controller import db
import nltk

# drop all existing
db.drop_all()

# create the database and db tables
db.create_all()

db.session.commit()

print('[app] DB initialized')


nltk.download('punkt')

print('[app] nltk packages downloaded')

from controller import db

# drop all existing
db.drop_all()

# create the database and db tables
db.create_all()

db.session.commit()

print('[db] DB initialized')

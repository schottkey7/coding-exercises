from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask application
app = Flask(__name__, template_folder='views')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hashtags.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create the sqlalchemy object
db = SQLAlchemy(app)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from hashtags.config import Development


# Initialize Flask application
app = Flask(__name__, template_folder='views')
app.config.from_object(Development)

# Create the sqlalchemy object
db = SQLAlchemy(app)

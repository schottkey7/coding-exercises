from flask import redirect, render_template, request, Flask
from werkzeug.exceptions import BadRequest, NotFound
from flask.ext.sqlalchemy import SQLAlchemy
from utils import shorten_url, valid_url


# Initialize Flask application
app = Flask(__name__, template_folder='views')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///urls.db'

# Create the sqlalchemy object
db = SQLAlchemy(app)

from models import *


@app.route("/")
def home():
    """Render the home page."""
    return render_template('home.html')


@app.route("/shorten")
def shorten():
    """ Return a shortened version of the original url """
    original_url = request.args.get('url')

    if original_url.startswith('www'):
        original_url = '{}{}'.format('https://', original_url)

    if not original_url:
        raise BadRequest()
    elif not valid_url(original_url):
        return render_template('error.html')

    existing_url = db.session.query(Url).filter(Url.original == original_url).first()

    if existing_url:
        # get shortened from db
        shortened_url = existing_url.shortened
        hits = existing_url.hits

    else:
        shortened_url = shorten_url(original_url)
        hits = 0
        # add to db
        db.session.add(Url(original_url, shortened_url))
        db.session.commit()

    # Render the result page
    short_url = "http://{}/{}".format(request.host, shortened_url)
    return render_template('shortened.html', short_url=short_url, hits=hits)


@app.route('/<path:path>')
def retrieve_original_url(path=''):
    """ Find the original URL and redirect the user to it """
    existing_url = db.session.query(Url).filter(Url.shortened == path).first()

    if not existing_url:
        raise NotFound()

    existing_url.hits += 1
    db.session.commit()
    return redirect(existing_url.original)


@app.route('/report')
def report():
    """ Generate top 10 most popular URLs report """
    all_rows = db.session.query(Url).order_by(Url.hits.desc()).limit(10).all()
    if not all_rows:
        results = False
    else:
        results = True
    return render_template('report.html', rows=all_rows, results=results)


if __name__ == "__main__":
    app.run(debug=True)

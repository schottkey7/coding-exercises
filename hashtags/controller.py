from flask import render_template
from helper import process_files, construct_report

from app import db, app
from models import Document


@app.route("/")
def home():
    """Render the home page"""
    skip = db.session.query(Document.name).all()

    # Process files in /documents
    process_files(skip)
    results = construct_report()

    return render_template('index.html', results=results, is_empty=results == [])


if __name__ == "__main__":
    app.run(debug=True)

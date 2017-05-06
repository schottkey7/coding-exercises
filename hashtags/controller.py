from flask import render_template, request
from helper import process_files, construct_report, get_files

from app import db, app
from models import Document


@app.route("/", methods=['GET'])
def home():
    """Render the home page"""
    all_files = tuple(get_files(None, []))
    results = construct_report()
    return render_template('index.html', files=all_files, results=results)


@app.route("/process", methods=['POST'])
def process():
    """Render the home page after submitting a processing request"""
    skip = db.session.query(Document.name).all()
    selected_files = tuple(request.form.getlist('doc_names'))

    # Process files in /documents
    process_files(files=selected_files, skip=skip)
    results = construct_report(selected_files)
    all_files = all_files = get_files(None, [])

    return render_template('index.html', files=all_files, results=results)


if __name__ == "__main__":
    app.run(debug=True)

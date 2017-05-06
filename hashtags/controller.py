from flask import render_template, request
from helper import process_files, construct_report,\
    get_all_files, process_web_doc, Response, get_all_db_docs

from app import app, db
from models import Document


@app.route("/", methods=['GET'])
def home():
    """Render the home page"""
    db_docs = get_all_db_docs()
    all_files = get_all_files(db_docs)
    results = construct_report()
    return render_template('home.html', files=all_files, results=results)


@app.route("/process", methods=['POST'])
def process():
    """Render the home page after submitting a processing request"""
    selected_files = tuple(request.form.getlist('doc_names'))

    url = request.form.get('url')
    alert = None
    results = []

    # Process a web document
    if url:
        if db.session.query(Document.name).filter_by(name=url).all():
            alert = Response(
                302,
                'Duplicate URL. The file at {} is already available.'.format(url))
        else:
            alert = process_web_doc(url)

    db_docs = get_all_db_docs()

    if selected_files:
        # Process files in /documents
        process_files(files=selected_files, skip=db_docs)
        results = construct_report(selected_files)

    all_files = get_all_files(db_docs)

    return render_template('home.html', files=all_files, results=results, alert=alert)


if __name__ == "__main__":
    app.run(debug=True)

from flask import render_template, request

from hashtags.app import app, db
from hashtags.models import Document
from hashtags.helper import process_files, construct_report,\
    get_all_files, process_web_doc, Response, get_all_db_docs


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
    selected_files = tuple(request.values.getlist('doc_names'))
    url = request.values.get('url')
    alert = None
    results = []

    # Process a web document
    if url:
        if db.session.query(Document.name).filter_by(name=url).all():
            msg = 'Duplicate URL. The file at {} is already available.'.format(url)
            alert = Response(302, msg)
        else:
            alert = process_web_doc(url)

    db_docs = get_all_db_docs()

    if selected_files:
        # Process files in /documents
        process_files(files=selected_files, skip=db_docs)
        results = construct_report(selected_files)

    all_files = get_all_files(db_docs)

    return render_template('home.html', files=all_files, results=results, alert=alert)

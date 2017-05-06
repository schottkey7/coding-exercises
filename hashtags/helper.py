import os
import re
import requests as req

from app import db
from bs4 import BeautifulSoup
from collections import defaultdict, namedtuple
from models import DocumentWords, Document, SentenceWords
from nltk.corpus import stopwords
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import func
from time import time


DOCUMENTS_FOLDER = 'documents/'
SENTENCES_REG = r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s'
WORDS_REG = r'\b[^\W\d_]+\b'

Response = namedtuple('Response', 'status_code msg')


def get_document_word(doc_id, word):
    return DocumentWords.query.filter_by(doc_id=doc_id, word=word).all()


def get_all_db_docs():
    return Document.query.order_by(Document.name.asc()).all()


def insert_document(doc):
    new_doc = Document(name=doc)
    db.session.add(new_doc)
    db.session.flush()
    db.session.commit()
    print('[app] Added document {}'.format(doc))
    return new_doc.id


def insert_sentence_word(word, sentence, doc_id):
    try:
        new_sentence_word = SentenceWords(word=word, sentence=sentence, doc_id=doc_id)
        db.session.add(new_sentence_word)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()


def insert_document_words(doc_id, words):
    for word, count in words.items():
        if not get_document_word(doc_id, word):
            new_document_word = DocumentWords(word=word, doc_id=doc_id, count=count)
            db.session.add(new_document_word)
            db.session.commit()


def process_raw(contents, doc_id):
    stop = set(stopwords.words('english'))
    sentences = re.split(SENTENCES_REG, contents)
    document_words = defaultdict(int)
    for sentence in sentences:
        words = [w.lower() for w in re.findall(WORDS_REG, sentence)]
        for word in words:
            if word not in stop:
                document_words[word] += 1
                insert_sentence_word(word, sentence, doc_id)

    return document_words


def process_web_doc(url):
    start = time()
    print('[app] Processing {}'.format(url))
    try:
        raw = req.get(url).content.decode('utf8')

        if not url.endswith('.txt'):
            raw = BeautifulSoup(raw, 'html.parser').get_text()

        doc_id = insert_document(url)
        document_words = process_raw(raw, doc_id)

        if document_words:
            insert_document_words(doc_id, document_words)

        return Response(200, '{} has been processed successfully.'.format(url))
    except req.exceptions.MissingSchema as exc:
        print('[app] Could not open {}. {}'.format(url, exc))
        return Response(
            400, 'Could not process document, "{}" is not a valid URL.'.format(url))
    except Exception as exc:
        print('[app] Could not open {}. {}'.format(url, exc))
        return Response(500, 'An error occurred whilst processing {}.'.format(url))

    print('[app] Finished processing {} after {:.2f}s'.format(url, time() - start))


def process_doc(file, doc_id):
    with open(file, 'r') as fr:
        contents = fr.read()
        document_words = process_raw(contents, doc_id)

        if document_words:
            insert_document_words(doc_id, document_words)


def get_all_files(docs_in_db):
    docs_in_db = set([doc.name for doc in docs_in_db])
    filenames = set([f for f in os.listdir(DOCUMENTS_FOLDER) if not f.startswith('.')])
    return tuple(docs_in_db.union(filenames))


def get_files_not_in_db(filenames, skip):
    if skip:
        skip_set = set([doc.name for doc in skip])
    else:
        skip_set = set()

    if not filenames:
        filenames = set(
            [f for f in os.listdir(DOCUMENTS_FOLDER) if not f.startswith('.')]
        )

    filenames = [f for f in filenames if f not in skip_set]
    return filenames


def process_files(files=[], skip=[]):
    start = time()
    filenames = get_files_not_in_db(files, skip)

    for doc_name in filenames:
        file = os.path.join(DOCUMENTS_FOLDER, doc_name)
        print('[app] Processing {}'.format(doc_name))
        doc_id = insert_document(doc_name)
        process_doc(file, doc_id)
        print('[app] Finished processing {} after {:.2f}s'.format(doc_name, time() - start))


def construct_report(selected_docs=None):
    top_words = 10
    limit_sentences = 5
    results = []

    total_count = func.sum(DocumentWords.count)
    docs = func.group_concat(Document.name.distinct())

    if selected_docs:
        query = db.session.query(DocumentWords.word, total_count, docs).\
            join(Document).\
            filter(Document.name.in_(selected_docs)).\
            group_by(DocumentWords.word).\
            order_by(total_count.desc()).limit(top_words)
    else:
        query = db.session.query(DocumentWords.word, total_count, docs).\
            join(Document).\
            group_by(DocumentWords.word).\
            order_by(total_count.desc()).limit(top_words)

    for word, count, docs in query.all():
        if selected_docs:
            sentences = db.session.query(SentenceWords.sentence).\
                join(Document).\
                filter(SentenceWords.word == word, Document.name.in_(selected_docs)).\
                limit(limit_sentences).all()
        else:
            sentences = db.session.query(SentenceWords.sentence).\
                filter_by(word=word).limit(limit_sentences).all()

        docs = docs.split(',')
        sentences = [(s[0], s[0].lower().find(word), len(word)) for s in sentences]

        results.append({
            'word': word,
            'documents': docs,
            'count': count,
            'sentences': sentences
        })

    return results

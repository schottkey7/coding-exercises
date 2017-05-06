import os
import re

from app import db
from collections import defaultdict
from models import Word, DocumentWords, Document, SentenceWords
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import func

from nltk.corpus import stopwords

DOCUMENTS_FOLDER = 'documents/'
SENTENCES_REG = r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s'
WORDS_REG = r'\b[^\W\d_]+\b'


def get_document_word(doc_id, word):
    return DocumentWords.query.filter_by(doc_id=doc_id, word=word).all()


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


def insert_document_words(doc, doc_id, words):
    for word, count in words.items():
        if not get_document_word(doc_id, word):
            new_document_word = DocumentWords(
                word=word, doc_id=doc_id, count=count)
            db.session.add(new_document_word)
            db.session.commit()


def insert_word(word):
    try:
        new_word = Word(word=word)
        db.session.add(new_word)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()


def process_doc(file, doc, doc_id, stop):
    with open(file, 'r') as fr:
        contents = fr.read()
        sentences = re.split(SENTENCES_REG, contents)
        document_words = defaultdict(int)
        for sentence in sentences:
            words = [w.lower() for w in re.findall(WORDS_REG, sentence)]
            for word in words:
                if word not in stop:
                    document_words[word] += 1
                    insert_word(word)
                    insert_sentence_word(word, sentence, doc_id)

    insert_document_words(doc, doc_id, document_words)


def get_files(filenames, skip):
    if skip:
        skip_set = set([doc[0] for doc in skip])
    else:
        skip_set = set()

    if not filenames:
        _, _, filenames = list(os.walk(DOCUMENTS_FOLDER))[0]

    filenames = [f for f in filenames if f not in skip_set]
    return filenames


def process_files(files=[], skip=[]):
    filenames = get_files(files, skip)
    stop = set(stopwords.words('english'))

    for doc in filenames:
        file = os.path.join(DOCUMENTS_FOLDER, doc)
        print('[app] Processing {}'.format(doc))
        doc_id = insert_document(doc)
        process_doc(file, doc, doc_id, stop)
        print('[app] Finished processing {}'.format(doc))


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
                filter_by(word=word).\
                filter(Document.name.in_(selected_docs)).\
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

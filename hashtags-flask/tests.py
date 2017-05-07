from hashtags import helper
import unittest
from uuid import uuid4

from hashtags.config import Test
from hashtags.controller import app, db
from hashtags.models import Document, DocumentWords, SentenceWords


class HashtagsTestCases(unittest.TestCase):
    """Test for API endpoints"""

    def create_app(self):
        app.config.from_object(Test)
        return app.test_client()

    def setUp(self):
        self.app = self.create_app()
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_home(self):
        """Test getting the home page"""
        response = self.app.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_empty_process(self):
        """Test processing"""
        response = self.app.post('/process')
        self.assertEqual(response.status_code, 200)

    def test_process_invalid_url(self):
        """Test posting invalid url to be processed"""
        form = {'url': 'http://test.url'}
        response = self.app.post('/process', data=form)
        docs = Document.query.filter_by(name=form['url']).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs, [])

    def test_process_valid_url(self):
        """Test posting invalid url to be processed"""
        form = {'url': 'https://projecteuler.net/'}
        response = self.app.post('/process', data=form)
        docs = Document.query.filter_by(name=form['url']).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs[0].name, form['url'])

    def test_process_invalid_file(self):
        """Test posting non-existing file to be processed"""
        data = {'doc_names': ['test.txt']}
        response = self.app.post('/process', data=data)

        docs = Document.query.\
            filter(Document.name.in_(tuple(data['doc_names']))).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs, [])

    def test_process_valid_file(self):
        """Test posting non-existing file to be processed"""
        data = {'doc_names': ['doc6.txt']}
        response = self.app.post('/process', data=data)

        docs = Document.query.\
            filter(Document.name.in_(tuple(data['doc_names']))).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs[0].name, data['doc_names'][0])

    def test_get_all_db_docs(self):
        results = helper.get_all_db_docs()
        self.assertIsInstance(results, list)

    def test_insert_document(self):
        doc_id = helper.insert_document('{}.txt'.format(uuid4()))
        self.assertIsInstance(doc_id, int)

    def test_process_raw(self):
        contents = 'This is a test string'
        document_words = helper.process_raw(contents, 15)
        self.assertEqual(document_words, {'test': 1, 'string': 1})

    def test_document_model(self):
        doc = Document()
        self.assertEqual(doc.__tablename__, 'Document')
        self.assertIsInstance(doc.query.all(), list)

    def test_document_words_model(self):
        doc = DocumentWords()
        self.assertEqual(doc.__tablename__, 'DocumentWords')
        self.assertIsInstance(doc.query.all(), list)

    def test_sentence_words_model(self):
        doc = SentenceWords()
        self.assertEqual(doc.__tablename__, 'SentenceWords')
        self.assertIsInstance(doc.query.all(), list)

if __name__ == '__main__':
    unittest.main()

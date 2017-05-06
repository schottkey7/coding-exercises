
from controller import app, db
import helper
import models
import unittest
from uuid import uuid4


class HashtagsTestCases(unittest.TestCase):
    """Test for API endpoints"""

    def setUp(self):
        # creates a test client
        self.app = app.test_client()
        # propagate the exceptions to the test client
        self.app.testing = True

        # drop all existing
        db.drop_all()
        # create the database and db tables
        db.create_all()
        db.session.commit()

    def tearDown(self):
        db.session.remove()

    def test_home(self):
        """Test getting the home page"""
        response = self.app.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_process(self):
        """Test posting data to be processed"""
        response = self.app.post('/process', content_type='html/text')
        self.assertEqual(response.status_code, 200)

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
        doc = models.Document()
        self.assertEqual(doc.__tablename__, 'Document')
        self.assertIsInstance(doc.query.all(), list)

    def test_document_words_model(self):
        doc = models.DocumentWords()
        self.assertEqual(doc.__tablename__, 'DocumentWords')
        self.assertIsInstance(doc.query.all(), list)

    def test_sentence_words_model(self):
        doc = models.SentenceWords()
        self.assertEqual(doc.__tablename__, 'SentenceWords')
        self.assertIsInstance(doc.query.all(), list)

if __name__ == '__main__':
    unittest.main()

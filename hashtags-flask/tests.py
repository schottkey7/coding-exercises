from mock import patch
from unittest import main, TestCase
from uuid import uuid4

from collections import namedtuple
from requests.exceptions import MissingSchema, ReadTimeout, ConnectionError

from hashtags.config import Test
from hashtags import helper
from hashtags.controller import app, db
from hashtags.models import Document, DocumentWords, SentenceWords


FakeResponse = namedtuple('Response', 'status_code msg content reason')


class HashtagsTestCases(TestCase):
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

    # -------------------------------------------------------------------------
    # API tests
    # -------------------------------------------------------------------------
    def test_home(self):
        response = self.app.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_empty_process(self):
        """Test processing"""
        response = self.app.post('/process')
        self.assertEqual(response.status_code, 200)

    def test_process_duplicate_valid_url(self):
        form = {'url': 'https://projecteuler.net/'}
        response = self.app.post('/process', data=form)
        docs = Document.query.filter_by(name=form['url']).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs[0].name, form['url'])
        self.assertEqual(len(docs), 1)

        response = self.app.post('/process', data=form)
        docs = Document.query.filter_by(name=form['url']).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs[0].name, form['url'])
        self.assertEqual(len(docs), 1)

    def test_process_invalid_file(self):
        data = {'doc_names': ['test.txt']}
        response = self.app.post('/process', data=data)

        docs = Document.query.\
            filter(Document.name.in_(tuple(data['doc_names']))).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs, [])

    def test_process_valid_file(self):
        data = {'doc_names': ['doc6.txt']}
        response = self.app.post('/process', data=data)

        docs = Document.query.\
            filter(Document.name.in_(tuple(data['doc_names']))).all()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(docs[0].name, data['doc_names'][0])

    # -------------------------------------------------------------------------
    # Helper tests
    # -------------------------------------------------------------------------
    def test_get_all_db_docs(self):
        results = helper.get_all_db_docs()
        self.assertIsInstance(results, list)

    def test_insert_document(self):
        doc_id = helper.insert_document('{}.txt'.format(uuid4()))
        self.assertIsInstance(doc_id, int)

    def test_get_files_not_in_db(self):
        filenames = sorted(helper.get_files_not_in_db([], []))
        all_files = sorted(helper.get_all_non_hidden_files())

        self.assertEqual(filenames, all_files)

    @patch('hashtags.helper.req.get')
    def test_construct_report_all(self, get_patch):
        url = 'mock://test.txt'
        response = FakeResponse(
            200, 'success', 'random content'.encode('utf-8'), '')
        get_patch.return_value = response
        result = helper.process_web_doc(url)
        result = helper.construct_report()

        expected = [
            {
                'count': 1,
                'documents': [u'mock://test.txt'],
                'word': u'content',
                'sentences': [(u'random content', 7, 7)]
            }, {
                'count': 1,
                'documents': [u'mock://test.txt'],
                'word': u'random',
                'sentences': [(u'random content', 0, 6)]
            }
        ]
        self.assertEqual(result, expected)

    def test_get_files_not_in_db_with_skip(self):
        skipped_doc = 'doc1.txt'
        skip = [Document(name=skipped_doc)]
        filenames = sorted(helper.get_files_not_in_db([], skip))
        all_files = sorted(helper.get_all_non_hidden_files())
        all_files.remove(skipped_doc)

        self.assertEqual(filenames, all_files)

    def test_process_raw(self):
        contents = 'This is a test string'
        document_words = helper.process_raw(contents, 15)
        self.assertEqual(document_words, {'test': 1, 'string': 1})

    @patch('hashtags.helper.req.get')
    def test_process_valid_web_text_doc(self, req_patch):
        url = 'mock://test.txt'
        response = FakeResponse(200, 'success', 'some content'.encode('utf-8'), '')
        req_patch.return_value = response
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()

        self.assertEqual(result.status_code, 200)
        self.assertEqual(
            result.msg, '{} has been processed successfully.'.format(url))
        self.assertEqual(docs[0].name, url)

    @patch('hashtags.helper.req.get')
    def test_process_valid_web_html_doc(self, get_patch):
        url = 'mock://test.html'
        response = FakeResponse(
            200, 'success', '<html><p>some content</p></html>'.encode('utf-8'), '')
        get_patch.return_value = response
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()

        self.assertEqual(result.status_code, 200)
        self.assertEqual(
            result.msg, '{} has been processed successfully.'.format(url))
        self.assertEqual(docs[0].name, url)

    @patch('hashtags.helper.req.get')
    def test_process_invalid_url(self, get_patch):
        url = 'mock://invalid.html'
        get_patch.side_effect = MissingSchema()
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()
        msg = 'Could not process document, "{}" is not a valid URL.'.format(url)

        self.assertEqual(result.status_code, 400)
        self.assertEqual(result.msg, msg)
        self.assertEqual(docs, [])

    @patch('hashtags.helper.req.get')
    def test_error_fetching_web_doc(self, get_patch):
        url = 'mock://forbidden.html'
        response = FakeResponse(302, 'Forbidden', '', 'Forbidden')
        get_patch.return_value = response
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()

        self.assertEqual(result.status_code, 500)
        self.assertEqual(result.msg, 'Error fetching file ({} {})'.format(
            response.status_code,
            response.reason
        ))
        self.assertEqual(docs, [])

    @patch('hashtags.helper.req.get')
    def test_process_url_timeout(self, get_patch):
        url = 'mock://timeout.html'
        get_patch.side_effect = ReadTimeout()
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()
        msg = 'Could not process document "{}", timeout exceeded.'.format(url)

        self.assertEqual(result.status_code, 500)
        self.assertEqual(result.msg, msg)
        self.assertEqual(docs, [])

    @patch('hashtags.helper.req.get')
    def test_process_url_connection_issue(self, get_patch):
        url = 'mock://cantconnect.html'
        get_patch.side_effect = ConnectionError()
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()
        msg = 'Failed to establish conection with "{}".'.format(url)

        self.assertEqual(result.status_code, 500)
        self.assertEqual(result.msg, msg)
        self.assertEqual(docs, [])

    @patch('hashtags.helper.req.get')
    def test_process_url_other_error(self, get_patch):
        url = 'mock://cantconnect.html'
        get_patch.side_effect = Exception()
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()
        msg = 'An error occurred whilst processing {}.'.format(url)

        self.assertEqual(result.status_code, 500)
        self.assertEqual(result.msg, msg)
        self.assertEqual(docs, [])

    def test_process_web_doc_pdf(self):
        url = 'mock://test.pdf'
        result = helper.process_web_doc(url)
        docs = Document.query.filter_by(name=url).all()

        self.assertEqual(result.status_code, 400)
        self.assertEqual(result.msg, 'PDF files are not currently supported.')
        self.assertEqual(docs, [])

    # -------------------------------------------------------------------------
    # Model tests
    # -------------------------------------------------------------------------
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
    main()

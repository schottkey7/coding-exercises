from controller import app, db
from utils import shorten_url
from models import *
import unittest


class FlaskURLShortenerTester(unittest.TestCase):

    def test_index(self):
        """ Test getting the home page """
        tester = app.test_client(self)
        response = tester.get('/', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_report(self):
        """ Test getting the report page """
        tester = app.test_client(self)
        response = tester.get('/report', content_type='html/text')
        self.assertEqual(response.status_code, 200)

    def test_shorten(self):
        """ Test the shorten function """
        url = "http://example.com"
        size = 5
        self.assertEqual(len(shorten_url(url, size)), size)

    def test_redirect(self):
        """ Test general redirect on /shorten """
        tester = app.test_client(self)
        response = tester.get('/shorten', content_type='html/text')
        # Should return 301 moved permanently
        self.assertEqual(response.status_code, 301)

    def test_retrieve_non_existent(self):
        """ Test GET on non existing shortened URL """
        url = "nonexistenttinyurl"
        tester = app.test_client(self)
        response = tester.get('/' + url, content_type='html/text')
        # Should return 404 not found
        self.assertEqual(response.status_code, 404)

    def test_retrieve_extant(self):
        """ Fetch an existing URL """
        existing_url = db.session.query(Url).first()
        tester = app.test_client(self)
        response = tester.get('/' + existing_url.shortened, content_type='html/text')
        # Should return 302 moved permanently after finding existing url
        self.assertEqual(response.status_code, 302)


if __name__ == '__main__':
    unittest.main()

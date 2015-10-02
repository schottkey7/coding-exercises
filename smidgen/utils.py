""" URL utilities """
import base64
from random import choice
import string
import md5
from urlparse import urlparse


def generate_unique_id(size, allowed_chars):
    return ''.join(choice(allowed_chars) for _ in range(size))


def shorten_url(url, size=6):
    """ Generate short hash of the input url """
    allowed_chars = string.ascii_uppercase + string.digits
    not_allowed_chars = ['=', '/']

    new_url = url + generate_unique_id(size, allowed_chars)
    shortened = base64.b64encode(md5.new(new_url).digest())[:size]

    for char in not_allowed_chars:
        shortened = shortened.replace(char, choice(allowed_chars))

    return shortened


def valid_url(url):
    """ Validate url """
    parsed_url = urlparse(url)
    if not parsed_url.scheme or not parsed_url.netloc:
        return False
    else:
        return True

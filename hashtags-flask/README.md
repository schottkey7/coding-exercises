# Creating Hashtags

## About

This is a simple web app that generates reports for most commonly occurring words (top 10) in individual documents or over a selection of them. The data is stored in a local sqlite database "hashtags.db". The sqlite database has limitations and performance suffers with large files.

To process more local files, please place them in the `/documents` folder and they will appear in the drop-down upon refresh. Currently only supports local .txt files.

To import web pages, specify a URL in the "Load Web Pages" section and hit "Process". After a successful import, the web document will appear in the drop-down menu and will be available for reports. Currently, only web pages containing text and html are supported.

I explored using the python package [spaCy](https://spacy.io/) for this task and concluded that it is for more advanced use cases when natural language processing becomes more central. For this task it was sufficient to find a way to obtain words and sentences from the text without understanding the components and the relationships between the words. For sentiment analysis, for example, spaCy would be ideal.

## Requirements

Create a virtual environment, for example (requires virtualenvwrapper):

```
mkvirtualenv --no-site-packages --python=/usr/local/bin/python3 hashtags
```

tested with python 3.6 and python 2.7.

To install the requirements, run:

```
pip install -r requirements.txt
```

## Usage

To initialize the database and to download the required nltk packages, run:

```
python initialize.py
```

Then, to run the application:

```
python hashtags.py
```

Then, navigate to <http://localhost:5000>.

To run tests and get a report of test coverage:

```
nosetests tests.py --with-coverage --cover-package=hashtags --cover-html
```

To view the coverage html report, open `cover/index.html` in a browser.

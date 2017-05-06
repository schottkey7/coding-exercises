## Creating Hashtags

### Requirements
Create a virtual environment, for example (requires virtualenvwrapper):
```
mkvirtualenv --no-site-packages --python=/usr/local/bin/python3 hashtags
```

To install the requirements, run:
```
pip install -r requirements.txt
```


### Usage

To initialize the database, run:
```
python db_create.py
```

Then, to run the application:
```
python controller.py
```

Then, navigate to [http://localhost:5000](http://localhost:5000)

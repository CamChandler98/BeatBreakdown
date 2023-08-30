import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY');
    SPOTIFY_CLIENT_ID = os.environ.get('SPOTIFY_CLIENT_ID');
    SPOTIFY_CLIENT_SECRET = os.environ.get('SPOTIFY_CLIENT_SECRET');
    SQLALCHEMY_TRACK_MODIFICATIONS = False;
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here
    # SQLALCHEMY_DATABASE_URI = os.environ.get(
    #     'DATABASE_URL').replace('postgres://', 'postgresql://');
    SQLALCHEMY_ECHO = True;

    REDIRECT_URI = os.environ.get('REACT_APP_BASE_URL') if os.environ.get('FLASK_ENV') == 'production' else "http://localhost:5000"

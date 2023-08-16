from flask import Blueprint
from flask import request, redirect, url_for, Response, session
from app.config import Config
from urllib.parse import urlencode
from urllib.parse import quote_plus
from urllib.parse import quote
import base64
from datetime import timedelta
from base64 import b64encode
import requests
from requests import Request




auth_routes = Blueprint('auth', __name__);

spotify_id = Config.SPOTIFY_CLIENT_ID;
spotify_key = Config.SPOTIFY_CLIENT_SECRET;
redirect_uri = Config.REDIRECT_URI;
base_url = 'https://accounts.spotify.com/authorize';
scopes_array = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-library-read',
    'user-read-email', 
    'user-read-private',
    'streaming'
]

@auth_routes.get('/login')
def auth_login():
    scopes_string = ' '.join(scopes_array)

    url_params_dict = {
        'response_type' : 'code',
        'client_id' : spotify_id,
        'scope' : scopes_string,
    }
    redirect_uri_string = f"&redirect_uri={redirect_uri}/api/auth/token" 
    url_params = urlencode(url_params_dict, safe='/', quote_via=quote );
    auth_url = base_url + '?' + url_params + redirect_uri_string

   
    res = redirect(auth_url)

    res.headers['Access-Control-Allow-Origin'] = "*"

    return {'url' : auth_url}

@auth_routes.get('/token')
def get_auth_token():
    code = request.args.get('code')
    encoded_string = f"{spotify_id}:{spotify_key}"
    encoded_string_bytes = encoded_string.encode('ascii')
    base64_bytes = b64encode(encoded_string_bytes)
    base64_string = base64_bytes.decode('ascii')

    
    auth_string = f"Basic {base64_string}"
    auth_options = {
        'grant_type': "authorization_code",
        'code' : code,
        'redirect_uri' :  f"{redirect_uri}/api/auth/token",
        }

    headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : auth_string,
    }


    auth_res = requests.post('https://accounts.spotify.com/api/token', params = auth_options, headers=headers)
    auth_data = auth_res.json()

    referrer = request.referrer 
    print('ref')
    print(referrer)
    url_params = urlencode({'access_token': auth_data['access_token']})

    expires = int(auth_data['expires_in']) * 1000

    print('expires')
    print(expires)
    token = auth_data['access_token']
    refresh_token = auth_data['refresh_token']
    url = referrer 
    res = redirect(url)
    session['refresh_token'] = refresh_token
    res.set_cookie(key = 'access_token', value= token)
    res.set_cookie(key = 'refresh_token', value= refresh_token)
    return res


@auth_routes.get('/refresh')
def get_refresh_token():
    code = request.args.get('code')

    encoded_string = f"{spotify_id}:{spotify_key}"
    encoded_string_bytes = encoded_string.encode('ascii')
    base64_bytes = b64encode(encoded_string_bytes)
    base64_string = base64_bytes.decode('ascii')

    
    auth_string = f"Basic {base64_string}"
    auth_options = {
        'grant_type': "refresh_token",
        'refresh_token': session['refresh_token']
        }

    headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : auth_string,
    }


    auth_res = requests.post('https://accounts.spotify.com/api/token', params = auth_options, headers=headers)
    auth_data = auth_res.json()

    url_params = urlencode({'access_token': auth_data['access_token']})

    token = auth_data['access_token']
    print('auth data')
    print(auth_data)
    refresh_token = session['refresh_token']
    return {'token' : token, 'refresh_token' : refresh_token}
from flask import Blueprint
from flask import request, redirect, url_for
from app.config import Config
from urllib.parse import urlencode
from urllib.parse import quote_plus
from urllib.parse import quote
import base64
from base64 import b64encode
import requests




auth_routes = Blueprint('auth', __name__);

spotify_id = Config.SPOTIFY_CLIENT_ID;
spotify_key = Config.SPOTIFY_CLIENT_SECRET;
redirect_uri = Config.REDIRECT_URI;
base_url = 'https://accounts.spotify.com/authorize/';
scopes_array = [
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-library-read',
    'user-read-email', 
    'user-read-private',
    'streaming'
]

@auth_routes.get('/login')
def auth_login():
    scopes_string = ' '.join(scopes_array)

    url_params_dict = {
        'response_type' : 'token',
        'client_id' : spotify_id,
        'scope' : scopes_string,
    }

    redirect_uri_string = f"&redirect_uri={redirect_uri}" 
    url_params = urlencode(url_params_dict, safe='/', quote_via=quote );
    auth_url = base_url + '?' + url_params + redirect_uri_string

    return {'url' : auth_url}


@auth_routes.get('/token')
def get_auth_token(): 
    referrer = request.referrer;

    return request.get_data();

    # code = request.args.get('code')
    # encoded_string = f'{spotify_id}:{spotify_key}'
    # auth_string = "Basic " + base64.b64encode(bytes(encoded_string, "utf-8"))

    # auth_options = {
    #     'code' : code,
    #     redirect_uri :  f"{redirect_uri}/api/auth/token" ,
    #     'grant_type': "authorization_code",
    #     'headers': {
    #         'Authorization' : auth_string,
    #         'Content-Type' : 'application/x-www-form-urlencoded'
    #     }
    # }

    # auth_res = requests.post('https://accounts.spotify.com/api/token', data = auth_options)
    # print ('auth_res')
    # print(auth_res.text)
    # return auth_res.json()






  
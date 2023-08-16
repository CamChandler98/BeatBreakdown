import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TitleBar from './components/TitleBar';
import Scores from './components/Scores'
import Login  from './components/Login/Login';
import WebPlayback from './components/Playback/WebPlayback';

import { goSetToken, goSetRefreshToken } from './store/session';
import './app.css'

function App() {
  const [token, setToken] = useState('');
  const dispatch = useDispatch()



  useEffect(() => {

    let cookies = document.cookie
    let cookieList = cookies.split('; ')

    let sepCookies = cookieList.map(el => el.split('='))

    let cookieObj = {}

    sepCookies.forEach(el => cookieObj[el[0]] = el[1] )

    if(cookieObj['access_token'])
    {
      let token = cookieObj['access_token']
      dispatch(goSetToken(cookieObj['access_token']))
    }

    if(cookieObj['refresh_token'])
    {
      let token = cookieObj['refresh_token']
      dispatch(goSetRefreshToken(cookieObj['refresh_token']))
    }

    }, []);
  return (
    <BrowserRouter>
        <TitleBar />
    <Switch>
        <Route path = '*'>
        { (token === '') ? <Login/> : "it" }
        </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

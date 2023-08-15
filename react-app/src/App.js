import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TitleBar from './components/TitleBar';
import Scores from './components/Scores'
import Login  from './components/Login/Login';
import WebPlayback from './components/Playback/WebPlayback';
import './app.css'

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {

    const queryString = window.location.href
    console.log(queryString);
    
    let token = queryString.split('#')[1]
    console.log(token)
    const urlParams = new URLSearchParams(token);
    console.log(urlParams)

    if(urlParams.has('access_token')){
      let token = urlParams.get('access_token')
      setToken(token)
    }

    }, []);
  return (
    <BrowserRouter>
        <TitleBar />
    <Switch>
        <Route path = '*'>
        { (token === '') ? <Login/> : <WebPlayback token={token} /> }
        </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

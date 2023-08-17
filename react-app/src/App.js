import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TitleBar from './components/TitleBar';
import Scores from './components/Scores'
import Login  from './components/Login/Login';
import WebPlayback from './components/Playback/WebPlayback';
import Track from './components/Tracks/Track';
import TrackList from './components/Tracks/TrackList';

import { goSetToken, goSetRefreshToken, login, getUserInformation } from './store/session';

import { goGetUserPlaylists, getLibrary, goSetPlaylistTracks } from './store/spotify';
import './app.css'
import './main.css'
import { refreshTokens } from './util/SpotifyEndpoint';
import SideBar from './components/SideBar/SideBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('');
  const [library, setLibrary] = useState({})
  const [playlists, setPlaylists] = useState([])
  const [activeTracks, setActiveTracks] = useState([])

  const dispatch = useDispatch()
  
  const tokens = useSelector(state => state['session'])
  const user = useSelector(state => state.session.user)
  const libraryState = useSelector(state => state.spotify.library)
  const playListsState = useSelector(state => state.spotify.playlists)
  const playlistTracksState = useSelector(state => state.spotify.playlist_tracks)
  

  
  useEffect(() => {
    let cookies = document.cookie
    let cookieList = cookies.split('; ')
    let sepCookies = cookieList.map(el => el.split('='))
    let cookieObj = {}
    sepCookies.forEach(el => cookieObj[el[0]] = el[1] )
    console.log('cookie', cookieObj)
    
    if(cookieObj['access_token'] && tokens['token'] === null)
    {
      let token = cookieObj['access_token']
      dispatch(goSetToken(cookieObj['access_token']))
    }
    if(cookieObj['refresh_token'] && tokens['refresh_token'] === null)
    {
      let token = cookieObj['refresh_token']
      dispatch(goSetRefreshToken(cookieObj['refresh_token']))
    }
  }, []);
  
  useEffect( async ()=> {

    let authTokens = await refreshTokens()
    if( user && user['display_name']){
      setIsAuthenticated(true)
      dispatch(getLibrary(authTokens))
      dispatch(goGetUserPlaylists(authTokens))
      return
    }
    else{
      setIsAuthenticated(false)
      dispatch(getUserInformation(authTokens))
    }


    }, [user])

    useEffect(async () => {
        dispatch(getLibrary)
    }, [isAuthenticated])


    useEffect(() => {
      if(isAuthenticated && Object.values(libraryState).length > 0 ){
        setActiveTracks([...Object.values(libraryState)])
        console.log('active' , activeTracks)
      }
    }, [libraryState])

    useEffect(() => {
      if(isAuthenticated && Object.values(playListsState).length > 0 ){
        setPlaylists([...Object.values(playListsState)])
      }
    }, [playListsState])

    useEffect(() => {
      if(isAuthenticated && Object.values(playlistTracksState).length > 0 ){
        setActiveTracks([...Object.values(playlistTracksState)])
      }
    }, [playlistTracksState])


  return (
    <BrowserRouter>
    <TitleBar></TitleBar>
    <Switch>
        <Route path = '*'>
        { (!isAuthenticated) ? <Login/> :  
        <div className='main'>
                 <SideBar playlists={playlists}/>
                 <TrackList tracks={activeTracks}></TrackList>
        </div>
      }
        </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

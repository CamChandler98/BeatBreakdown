import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import anime from 'animejs'

import TitleBar from './components/TitleBar';
import Scores from './components/Scores'
import Login  from './components/Login/Login';
import WebPlayback from './components/Playback/WebPlayback';
import Track from './components/Tracks/Track';
import TrackList from './components/Tracks/TrackList';

import { goSetToken, goSetRefreshToken, login, getUserInformation } from './store/session';

import spotify, { goGetUserPlaylists, getLibrary, goSetPlaylistTracks } from './store/spotify';
import './app.css'
import './main.css'
import { refreshTokens } from './util/SpotifyEndpoint';
import SideBar from './components/SideBar/SideBar';
import InfoBar from './components/InfoBar/InfoBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('');
  const [library, setLibrary] = useState({})
  const [playlists, setPlaylists] = useState([])
  const [activeTracks, setActiveTracks] = useState([])
  const [activePlaylist, setActivePlaylist] = useState({})
  const [trackFeatures, setTrackFeatures] = useState({})

  const [headerColors, setHeaderColors] = useState(['#DD4C58','#377771', '#CB8345', '#6D7085'])
  const [currentColor, setCurrentColor] = useState('')

  const dispatch = useDispatch()
  
  const tokens = useSelector(state => state['session'])
  const user = useSelector(state => state.session.user)
  const libraryState = useSelector(state => state.spotify.library)
  const playListsState = useSelector(state => state.spotify.playlists)
  const tracksState = useSelector(state => state.spotify.tracks)
  const activeTrackFeaturesState = useSelector(state => state.spotify.track_features)
  const activePlaylistState = useSelector(state => state.spotify.active_playlist)
  
  useEffect(() => {
    let cookies = document.cookie
    let cookieList = cookies.split('; ')
    let sepCookies = cookieList.map(el => el.split('='))
    let cookieObj = {}
    sepCookies.forEach(el => cookieObj[el[0]] = el[1] )
    //console.log('cookie', cookieObj)
    
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
      // dispatch(getLibrary(authTokens))
      // dispatch(goGetUserPlaylists(authTokens))
      return
    }
    else{
      setIsAuthenticated(false)
      dispatch(getUserInformation(authTokens))
    }


    }, [user])

    useEffect(async () => {
      let authTokens = JSON.parse(localStorage.getItem('tokens'))
      dispatch(getLibrary)
      dispatch(goGetUserPlaylists(authTokens))

    }, [isAuthenticated])


    useEffect(() => {
      if(isAuthenticated && Object.values(libraryState).length > 0 ){
        setActiveTracks([...Object.values(libraryState)])
        //console.log('active' , activeTracks)
      }
    }, [libraryState])

    useEffect(() => {
      if(isAuthenticated && Object.values(playListsState).length > 0 ){
        setPlaylists([...Object.values(playListsState)])

        let playlist = Object.values(playListsState)[0]
        let data = {
          id: playlist['id'],
          img: playlist['images'][0]['url'],
          name: playlist['name'],
          owner: playlist['owner'],
        }

    let authTokens = JSON.parse(localStorage.getItem('tokens'))

        dispatch(goSetPlaylistTracks(authTokens, data))
      }
    }, [playListsState])

    useLayoutEffect(() => {
      if(isAuthenticated && Object.values(tracksState).length > 0 ){

        setActiveTracks([...Object.values(tracksState)])
        let color = headerColors.shift()
        headerColors.push(color)

        setCurrentColor(color)

        setActivePlaylist({...activePlaylistState})
        anime({
          targets: '.track-list',
          filter: "blur(0px)",
          easing:  'cubicBezier(.5, .05, .1, .3)',
          duration:900,
          loop: false,
          delay: 0
        })
      }
    }, [tracksState])

    useEffect(() => {
      if(isAuthenticated && activeTrackFeaturesState['info'].length > 0){
        setTrackFeatures({
          id: activeTrackFeaturesState.id,
          info : [...activeTrackFeaturesState.info ],
          percent : [...activeTrackFeaturesState.percent ]
        })
      }
    }, [activeTrackFeaturesState])

  return (
    <BrowserRouter>
    <TitleBar title = {'BeatBreakdown'}></TitleBar>
    <Switch>
        <Route path = '*'>
        { (!isAuthenticated) ? <Login/> :  
        <div className='main'>
                 <SideBar playlists={playlists}/>
                 <TrackList tracks={activeTracks} playlist = {activePlaylist} color={currentColor}></TrackList>
                 <InfoBar features = {trackFeatures} />
        </div>
      }
        </Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

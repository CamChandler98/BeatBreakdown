import { fetchDataEndpoint, refreshTokens, simplifyTrack, getDataNext } from "../util/SpotifyEndpoint"
import { goSetTokens } from "./session"


const SET_LIBRARY = 'spotify/SET_LIBRARY'
const SET_PLAYLIST = 'spotify/SET_PLAYLIST'
const SET_USER_PLAYLISTS = 'spotify/SET_USER_PLAYLISTS'
const SET_PLAYLIST_TRACKS = 'spotify/SET_PLAYLIST_TRACKS'
const SET_NEXT = 'spotify/SET_NEXT'


const setUserPlaylists = (data) => ({
    type: SET_USER_PLAYLISTS,
    playlists : data
})


const setPlaylist = (data) => ({
    type: SET_PLAYLIST,
    playlist: data
})

const setPlaylistTracks = (data) => ({
    type: SET_PLAYLIST_TRACKS,
    playlist_tracks: data
})

const setLibrary = (data) => ({
    type: SET_LIBRARY,
    tracks: data
})

const setNext = (next) => ({
    type: SET_NEXT,
    next : next
})


export const goGetUserPlaylists = (token) => async (dispatch) => {
    let data = await fetchDataEndpoint(token,'me/playlists')
    console.log('original', data)
    let playlistOBJ = {}

    for(let playlistKey in data['items']){
        

        let playlist = data['items'][playlistKey]

        if(playlist.tracks.total > 0){
        playlistOBJ[playlist['id']] = playlist
        }
    }
    
    dispatch(setUserPlaylists(playlistOBJ))

}

export const goSetPlaylistTracks = (token,id) => async(dispatch) => {
    let endpoint = `playlists/${id}/tracks`
    let data = await fetchDataEndpoint(token, endpoint)
    data = await simplifyTrack(token,data)
    dispatch(setPlaylistTracks(data))
}

export const getLibrary = (token, next = '') => async (dispatch) => {
    let data = await fetchDataEndpoint(token,'me/tracks' )
    data = await simplifyTrack(token,data)

    let next = getDataNext(data)

    dispatch(setLibrary(data))
    dispatch(setNext(next))

}

const initialState = {playlists : {}, tracks: {}, playlist_tracks:  {}, next : '', library: {}}

export default function spotify (state = initialState, action){
    switch(action.type){
        case SET_LIBRARY:
            return {
                ...state, 
                tracks: {...action.tracks.items},
                library: {...action.tracks.items}
                }
        case SET_NEXT:
            return {
                ...state,
                next: action.next 
            }
        case SET_USER_PLAYLISTS :
            return{
                ...state,
                playlists:  {...action.playlists}
        }
        case SET_PLAYLIST_TRACKS : 
            return{
                ...state,
                playlist_tracks: {...action.playlist_tracks.items}
            }
        default:
            return state
    }
}



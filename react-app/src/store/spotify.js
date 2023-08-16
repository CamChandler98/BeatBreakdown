import { fetchDataEndpoint, refreshTokens, simplifyTrack } from "../util/SpotifyEndpoint"
import { goSetTokens } from "./session"


const SET_LIBRARY = 'spotify/SET_LIBRARY'
const SET_PLAYLIST = 'spotify/SET_PLAYLIST'
const SET_USER_PLAYLISTS = 'spotify/SET_USER_PLAYLISTS'
const SET_NEXT = 'spotify/SET_NEXT'


const setUserPlaylists = (data) => ({
    type: SET_USER_PLAYLISTS,
    playlists : data
})
const setPlaylist = (data) => ({
    type: SET_PLAYLIST,
    playlist: data
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
    dispatch(setUserPlaylists(data))

}

export const getLibrary = (token, next = '') => async (dispatch) => {
    let data = await fetchDataEndpoint(token,'me/tracks' )
     data = await simplifyTrack(token,data)


    let fullNext = data.next;

    let nextArr = fullNext.split('v1/')

    let next = nextArr[1]

    dispatch(setLibrary(data))
    dispatch(setNext(next))

}

const initialState = {playlists : {}, tracks: {}, next : ''}

export default function spotifyReducer (state = initialState, action){
    switch(action.type){
        case SET_LIBRARY:
            return {
                ...state,
                tracks: {...action.tracks.items}
                }
        
        case SET_NEXT:
            return {
                ...state,
                next: action.next 
            }
        case SET_USER_PLAYLISTS :
            return{
                ...state,
                playlists: action.playlists
            }
        default:
            return state
    }
}



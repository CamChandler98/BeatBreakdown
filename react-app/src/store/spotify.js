import { fetchDataEndpoint, refreshTokens, simplifyTrack, getDataNext, getTrackFeatures } from "../util/SpotifyEndpoint"
import { goSetTokens } from "./session"


const SET_LIBRARY = 'spotify/SET_LIBRARY'
const SET_PLAYLIST = 'spotify/SET_PLAYLIST'
const SET_USER_PLAYLISTS = 'spotify/SET_USER_PLAYLISTS'
const SET_PLAYLIST_TRACKS = 'spotify/SET_PLAYLIST_TRACKS'
const SET_NEXT = 'spotify/SET_NEXT'
const SET_TRACK_FEATURES = 'spotify/SET_TRACK_FEATURES'
const SET_RECOMMENDED_TRACKS = 'spotify/SET_RECOMMENDED_TRACKS'


const setTrackFeatures = (data) => ({
    type: SET_TRACK_FEATURES,
    track_features: data 
})

const setRecommendedTracks = (data) => ({
    type: SET_RECOMMENDED_TRACKS,
    tracks: data
})

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

export const getRecommendedTracks = (data) => async (dispatch) => {
    let searchParams = new URLSearchParams(data)
    let queryString = searchParams.toString();

    let endpoint = `recommendations?${queryString}`

    let token = localStorage.getItem('tokens')
    let outData = await fetchDataEndpoint(token, endpoint)
    let tracks = await simplifyTrack(token, outData)
    dispatch(setRecommendedTracks(tracks))
}
export const goGetTrackFeatures = (token, id) => async (dispatch) => {

    let data = await getTrackFeatures(id,token)
    dispatch(setTrackFeatures(data))
}

export const goGetUserPlaylists = (token) => async (dispatch) => {
    let data = await fetchDataEndpoint(token,'me/playlists')
    //console.log('original', data)
    let playlistOBJ = {}

    for(let playlistKey in data['items']){
        

        let playlist = data['items'][playlistKey]

        if(playlist.tracks.total > 0){
        playlistOBJ[playlist['id']] = playlist
        }
    }
    
    dispatch(setUserPlaylists(playlistOBJ))

}

export const goSetPlaylistTracks = (token,inData) => async(dispatch) => {
    let endpoint = `playlists/${inData.id}/tracks`
    let data = await fetchDataEndpoint(token, endpoint)
    data = await simplifyTrack(token,data)

    data['playlist'] = inData
    dispatch(setPlaylistTracks(data))
}

export const getLibrary = (token, next = '') => async (dispatch) => {
    let data = await fetchDataEndpoint(token,'me/tracks' )
    data = await simplifyTrack(token,data)

    let next = getDataNext(data)

    dispatch(setLibrary(data))
    dispatch(setNext(next))

}

const initialState = {active_playlist: {} , 
playlists : {}, 
tracks: {},
rec_tracks:{},playlist_tracks:  {}, next : '', library: {}, track_features : {info: [], percent: []}}

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
                track_features : {...initialState.track_features},
                tracks: {...action.playlist_tracks.items},
                active_playlist: {...action.playlist_tracks.playlist}
            }
        case SET_TRACK_FEATURES : 
            return{
                ...state,
                track_features: {
                    id: action.track_features.id,
                    info : [...action.track_features.info ],
                    percent : [...action.track_features.percent ],
                    origin: {...action.track_features.origin} 
                }
            }
        case SET_RECOMMENDED_TRACKS : 
        return{
            ...state,
            track_recs: {...action.tracks.items}
        }
        default:
            return state
    }
}



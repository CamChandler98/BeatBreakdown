import { store } from "../index"
import { goSetTokens } from "../store/session"

export const refreshTokens = async () => {
    let res = await fetch('/api/auth/refresh', {method: 'GET', mode : 'cors'})
    let data = await res.json()
    return data
}


const getArtists = ( artistObj) => {
    let artists = []
    for(let artistKey in artistObj){
        
        let artist = artistObj[artistKey];

        let name = artist['name']
        artists.push(name)
    }
    return artists
}

export const getDataNext = (data) => {

    if(!data.next)
    {
        return
    }
    let fullNext = data.next;

    let nextArr = fullNext.split('v1/')

    let next = nextArr[1]
}

export const fetchDataEndpoint =  async (token, endpoint, baseUrl = 'https://api.spotify.com/v1/') => {
    let url = baseUrl + endpoint
    let tokens = await refreshTokens()
    let authString = `Bearer ${tokens['token']}`
   let res = await fetch(url, {
        headers: {
            Authorization : authString
        }
    })

    let data = await res.json()
    
    if(data.error){
        //console.log(data.error)
        // //console.log('token' , token)
    }
    if(data.error && data.error.message === "The access token expired")
    {
        //console.log('old tokens', token)
        let tokens = await refreshTokens()
        //console.log('new tokens', tokens)
        store.dispatch(goSetTokens(tokens))

        await fetchDataEndpoint(tokens,endpoint,baseUrl)
    }
    return data
}

export const getTrackFeatures  = async (id, token, endpoint= 'audio-features/', baseUrl = 'https://api.spotify.com/v1/' ) => {
    // //console.log(token)
    let url = baseUrl + endpoint + id
    let tokens = await refreshTokens()
    let authString = `Bearer ${tokens['token']}`

    let res = await fetch(url, {
        headers: {
            Authorization : authString
        }
    })
    let data = await res.json()

    if(data.error && data.error.message === "The access token expired")
    {
        //console.log('old tokens', token)
        let tokens = await refreshTokens()
        let authString = `Bearer ${tokens['token']}`
        let res = await fetch(url, {
            headers: {
                Authorization : authString
            }
        })
        data = await res.json()
    }
let processed =   simplifyTrackFeatures(data)
processed.id = id
    return processed    
}

const simplifyTrackFeatures = (track) => {

    let{
        acousticness,
        danceability,
        energy,
        instrumentalness,
        key,
        liveness,
        loudness,
        mode,
        speechiness,
        tempo,
        time_signature,
        valence
    } = track



    let infoObj = { mode,
        key,
        time_signature,
        tempo,
        }
        
    let percentObj = {
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        loudness,
        speechiness,
        valence
    }

    let infoArray = []
    let percentArray = []
    for (let itemKey in infoObj)
    {
        let itemInfo = {
            label: itemKey,
            value: infoObj[itemKey]
        }

        infoArray.push(itemInfo)
    }

    for (let itemKey in percentObj)
    {
        let itemInfo = {
            label: itemKey,
            value: percentObj[itemKey]
        }
        percentArray.push(itemInfo)
    }

    return {
        info: infoArray,
        percent: percentArray
    }
}

export const simplifyTrack = async (token, data) => {

    let processed = {}
    for(const trackKey in data.items)
    {
        let trackObj = data.items[trackKey]['track']
        let id = trackObj['id']
        let order = ''
        let name = trackObj['name']
        let artists = getArtists(trackObj['artists']);
        let artistsString = artists.join(', ')
        let albumArt = trackObj['album']['images'][1]
        let albumName = trackObj['album']['name']
        let previewUrl = trackObj['preview_url']
        let features = getTrackFeatures(id, token)

        processed[id] = {
            id,
            name,
            artists,
            artistsString,
            albumArt,
            albumName,
            previewUrl,
            features
        }
    }
    //console.log(processed)
    data.items = processed
    return data
}
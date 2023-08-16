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
export const fetchDataEndpoint =  async (token, endpoint, baseUrl = 'https://api.spotify.com/v1/') => {
    let url = baseUrl + endpoint
    let authString = `Bearer ${token['token']}`

   let res = await fetch(url, {
        headers: {
            Authorization : authString
        }
    })

    let data = await res.json()
    console.log('data', data)
    if(data.error && data.error.message === "The access token expired")
    {
        console.log('HERE?')
        let tokens = await refreshTokens()
        console.log('tokens', tokens)
       store.dispatch(goSetTokens(tokens))
        await fetchDataEndpoint(tokens,endpoint,baseUrl)
    }
    return data
}

export const getTrackFeatures  = async (id, token, endpoint= 'audio-features/', baseUrl = 'https://api.spotify.com/v1/' ) => {
    console.log(token)
    let url = baseUrl + endpoint + id
    let authString = `Bearer ${token['token']}`

    let res = await fetch(url, {
        headers: {
            Authorization : authString
        }
    })
    let data = await res.json()
    return data    
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
        let albumArt = trackObj['album']['images'][0]
        let albumName = trackObj['album']['name']
        let previewUrl = trackObj['preview_url']
        let features = await getTrackFeatures(id, token)

        processed[trackKey] = {
            name,
            artists,
            albumArt,
            albumName,
            previewUrl,
            features
        }
    }
    console.log(processed)
    data.items = {...processed}
    return data
}
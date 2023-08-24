import { fetchDataEndpoint } from "../util/SpotifyEndpoint"
const SET_TOKEN = 'session/SET_TOKEN'
const SET_REFRESH_TOKEN = 'session/SET_REFRESH_TOKEN'
const SET_USER = 'session/SET_USER'
const SET_TOKENS = 'session/SET_TOKENS'


const setUser = (userInfo) => ({
    type: SET_USER,
    user: userInfo
})

const setToken = (token) => ({
    type: SET_TOKEN,
    token: token
})

const setRefreshToken = (token) => ({
    type: SET_REFRESH_TOKEN,
    token: token
})

const setTokens = (tokens) => ({
    type: SET_TOKENS,
    tokens: tokens
})


export const login = () => async (dispatch) => {
    let res = await fetch('/api/auth/login', {method: 'GET', mode : 'cors'})

    let data = await res.json()
    
    if(data){
        let url = data['url']
        window.open(url , '_self')
    }
    
}

export const getUserInformation = (tokens) => async (dispatch) =>  {
    //console.log('tokens +>>', tokens)
    let data = await fetchDataEndpoint(tokens, 'me')

    dispatch(setUser(data))

 }

export const goSetTokens = (tokens) => async (dispatch) => {

    dispatch(setTokens(tokens))

}
export const goSetToken = (token) => async (dispatch) => {
        dispatch(setToken(token))
}

export const goSetRefreshToken = (token) => async (dispatch) => {
     dispatch(setRefreshToken(token))
}

const initialState = {token : null, refresh_token : null, user :{}}


export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_TOKEN:
            return {...state, token : action.token}
        case SET_REFRESH_TOKEN:
            return {...state, refresh_token : action.token}
        case SET_TOKENS : 
            return {...action.tokens, user:state.user}
        case SET_USER: 
        return {...state, user: {...action.user}}
        default:
            return state
    }
}
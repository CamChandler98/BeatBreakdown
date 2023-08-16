const SET_TOKEN = 'session/SET_TOKEN'
const SET_REFRESH_TOKEN = 'session/SET_REFRESH_TOKEN'

const SET_TOKENS = 'session/SET_TOKENS'



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
        console.log('continue?')
    }
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

const initialState = {token : null, refresh_token : null}


export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_TOKEN:
            return {...state, token : action.token}
        case SET_REFRESH_TOKEN:
            return {...state, refresh_token : action.token}
        case SET_TOKENS : 
            return {...action.tokens}
        default:
            return state
    }
}
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../store/session';
function Login() {


    const dispatch = useDispatch();

    const getAuthLink = async () => {
        let res = await fetch('/api/auth/login', {method: 'GET', mode : 'cors'})

        let data = await res.json()
        
        if(data){
            let url = data['url']
            window.open(url , '_self')
            //console.log('continue?')
        }
    }
    
    return (
        <div className="App">
            <header className="App-header">
                <a className="btn-spotify" onClick={getAuthLink} >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;


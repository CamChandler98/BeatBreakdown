import React from 'react';

function Login() {
    const getAuthLink = async () => {
        let res = await fetch("/api/auth/login", {mode:'cors'})
        console.log(res)
        let link = await res.json()
        console.log(link)
        window.open(link['url'], '_self')
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


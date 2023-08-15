import React, { useState, useEffect } from 'react';
const Buttons = (props) => {

    let spotifyBaseUrl = 'https://api.spotify.com/v1/'
    let authString = `Bearer ${props.token}` 

    const togglePlay = async (is_paused) => {
        let endpoint

        if(is_paused){
            endpoint =  'me/player/play'
        }
        else
        {
            endpoint =  'me/player/pause'

        }
        let url = spotifyBaseUrl + endpoint

        let res = await fetch(url, {
            method : 'PUT',
            headers : {
                Authorization: authString,
                "Content-Type" : 'application/json'
            },
            // body : JSON.stringify({  "position_ms": 0})
        })

        if(res.status == 204){
            console.log('success')
        }
    }

    const skip = async (direction)  => {
        let endpoint

        if(direction === '>')
        {
            endpoint = 'me/player/next'
        }
        else{
            endpoint = 'me/player/previous'
        }
2
        let url = spotifyBaseUrl + endpoint

        let res = await fetch(url, {
            method : 'POST',
            headers : {
                Authorization: authString,
                "Content-Type" : 'application/json'
            },
            // body : JSON.stringify({  "position_ms": 0})
        })

        if(res.status == 204){
            console.log('success')
        }
    }

    useEffect(()=> {
        if(props.is_paused)
        {

        }
        else
        {

        }
    }, [props.is_paused])
    return (
     
        <div className="now-playing__side">

        <button className="btn-spotify" onClick={() => { skip('<')  }} >
            &lt;&lt;
        </button>

        <button className="btn-spotify" onClick={() => {togglePlay(props.is_paused)}} >
          {props.is_paused ? 'play' : 'pause'}
        </button>

        <button className="btn-spotify" onClick={() => { skip('>') }} >
            &gt;&gt;
        </button>
    </div>
    );
}

export default Buttons
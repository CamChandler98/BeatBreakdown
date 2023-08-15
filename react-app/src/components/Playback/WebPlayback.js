import React, { useState, useEffect } from 'react';
import Buttons from './Buttons'

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    let spotifyBaseUrl = 'https://api.spotify.com/v1/'
    let authString = `Bearer ${props.token}` 

    useEffect(() => {
        let endpoint = 'me/player'
        let url = spotifyBaseUrl + endpoint
        
        setInterval(() => {
            fetch(url, {
                headers: {
                    Authorization : authString
                }
            })
            .then(res => res.json())
            .then(data => {
                let playState = data['is_playing']

                setPaused(!playState)
            }) 
        }, 100 )
    }, []);



        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <img src={current_track.album.images[0].url} className="now-playing__cover" alt="" />
                        <Buttons token = {props.token} baseUrl = {spotifyBaseUrl} authString = {authString} is_paused = {is_paused}/>
                    </div>
                </div>
            </>
        );
    
}

export default WebPlayback

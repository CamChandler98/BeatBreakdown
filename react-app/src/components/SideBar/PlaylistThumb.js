import { useDispatch, useSelector } from 'react-redux'
import './PlaylistThumb.css'
import { goSetPlaylistTracks } from '../../store/spotify'
import { refreshTokens } from '../../util/SpotifyEndpoint'
import anime from 'animejs'

const PlaylistThumb = ({playlist}) => {
    const token = useSelector(state => state.session)
    const dispatch = useDispatch()

    const getTracks = async (id) => {
        let tokens = await refreshTokens()

        dispatch(goSetPlaylistTracks(tokens, id))
    }
    const hasImage = (playlist) => {

        if(playlist['images'].length > 1)
        {
            return playlist['images'][2]['url']        
        }
        else
        {
            return playlist['images'][0]['url']
        }
    }
    return(
        <>
        {
        playlist && 
        <div className="playlist-thumb" onClick={ () => {

            anime({
                targets: '.track-list',
                filter: ["blur(5px)", "blur(70px)", ],
                easing:  'cubicBezier(.5, .05, .1, .3)',
                duration:900,
                loop: false,
                delay: 0
              })
            getTracks(playlist.id)
        }}>
            
            <img src = {hasImage(playlist) } className="playlist-thumb-img"/>
  
            <div className="playlist-thumb-text">
                <span>{playlist['name']}</span>
                <span>{playlist['owner']['display_name']}</span>
            </div>

        </div>
        }
        </>
    )
}

export default PlaylistThumb
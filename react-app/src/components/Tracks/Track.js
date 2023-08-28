import { useDispatch, useSelector } from "react-redux"
import "./Tracks.css"
import { getTrackFeatures } from "../../util/SpotifyEndpoint"
import { goGetTrackFeatures } from "../../store/spotify"

const Track = ({track}) => {

    
    let tokens = useSelector(state => state.session)
    const dispatch = useDispatch()

    const getFeatures =  (id) => {
        //console.log(id, tokens)
        dispatch(goGetTrackFeatures(tokens, id ))
    }

    return(
    <div className= "track-container" onClick= {()=> {
        getFeatures(track.id)
    }}>
        <div className="track-img">
            <img src={track['albumArt']['url']} />
        </div>

        <div className="track-text">
        </div>
        <div className="track-text">

            <h1>
                {track.name}
            </h1>
            <p>
            {`Artist: ${track.artistsString}`}
            </p>
            <p>
            {`Album: ${track.albumName}`}
            </p>
        </div>
    </div>
    )
}

export default Track
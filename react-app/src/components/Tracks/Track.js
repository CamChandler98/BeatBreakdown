import "./Tracks.css"

const Track = ({track}) => {


    return(
    <div className= "track-container">
        <div className="track-img">
            <img src={track['albumArt']['url']} />
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
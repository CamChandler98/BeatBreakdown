const RecTrack = ({track}) => {

    return(

        <div className="rec-display"> 
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


export default RecTrack
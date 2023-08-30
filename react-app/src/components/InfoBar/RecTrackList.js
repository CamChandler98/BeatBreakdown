import RecTrack from "./RecTrack"

const RecTrackList = ({tracks}) => {
    console.log('rec tracks ->>>>', tracks)
    return(
        <div className="recs-container">
            {
                tracks && tracks.map(track => {
                    return(
                        <RecTrack key = {track.id} track={track} />
                    )
                })
            }
        </div>
    )
}


export default RecTrackList
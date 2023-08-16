import Track from "./Track";

const TrackList = ({tracks}) => {
    
    return(
        <>
        { tracks.length >= 1 &&

            <div className="track-list">
        
                    {tracks.map(track => {
                        return(
                         <Track key= {track.id} track={track} />
                        )
                    })}
                
            </div>
            
        }
        { tracks.length < 1 &&

            <div className="no-tracks-list">

            </div>

        }
        </>

    )
}

export default TrackList
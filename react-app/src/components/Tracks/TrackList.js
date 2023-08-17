import Track from "./Track";

const TrackList = ({tracks}) => {
    
    return(


            <div className="track-list">
                <div className = 'track-list-header'>
                    <h1>

                    </h1>
                </div>
                    {tracks && tracks.map(track => {
                        return(
                         <Track key= {track.id} track={track} />
                        )
                    })}
                
            </div>
            
    
    )
}

export default TrackList
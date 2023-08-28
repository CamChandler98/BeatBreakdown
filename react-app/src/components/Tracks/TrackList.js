import Track from "./Track";
import InfiniteScroll from "react-infinite-scroll-component";
const TrackList = ({tracks, playlist, color}) => {

    console.log('from tracklist' , playlist)
    return(

            <div className="track-list"
            >
                {
                playlist && playlist['owner'] &&
                 <div className = 'track-list-header' style= {{backgroundColor: color}}>
                <img src = {playlist['img']}  className="track-list-img"  />
  
                <div className="track-list-text">
                    <span>{playlist['name']}</span>
                    <span>{`By: ${playlist['owner']['display_name']}`}</span>
                </div>
                </div>
                }
                    {tracks && tracks.map(track => {
                        return(
                         <Track key= {track.id} track={track} />
                        )
                    })}
                {
                    tracks.length < 1  &&
                    <div className="track-placeholder">
                        <p>
                            Select a playlist on the left!
                        </p>
                    </div>
                }
            </div>
            
    
    )
}

export default TrackList
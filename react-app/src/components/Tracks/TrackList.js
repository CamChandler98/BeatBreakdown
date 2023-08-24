import Track from "./Track";
import InfiniteScroll from "react-infinite-scroll-component";
const TrackList = ({tracks}) => {
    //console.log('from tracklist' , tracks)
    return(

            <InfiniteScroll className="track-list"
                dataLength = {tracks.length}
                hasMore = {false}
                loader = {<h4>Loading...</h4>}
            >
                <div className = 'track-list-header'>
                    <h1>

                    </h1>
                </div>
                    {tracks && tracks.map(track => {
                        return(
                         <Track key= {track.id} track={track} />
                        )
                    })}
                
            </InfiniteScroll>
            
    
    )
}

export default TrackList
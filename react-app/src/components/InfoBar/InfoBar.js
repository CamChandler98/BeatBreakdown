import InfoBarItem from "./InfoBarItem"
import InfoBarPercent from "./InfoBarPrecent"
import RecTrackList from "./RecTrackList"
import './InfoBar.css'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getRecommendedTracks } from "../../store/spotify"
import anime, { easings } from "animejs"

const InfoBar = ({features, trackInfo}) => {
    
    const [track, setTrack] = useState({})
    const [recTracks, setRecTracks] = useState([])
    const [hasRecs, setHasRecs] = useState(false)
    const dispatch = useDispatch()

    let tracks = useSelector(state => state['spotify']['tracks'])
    let featuresState = useSelector(state =>state['spotify']['track_features'] )
    let recState = useSelector (state =>state['spotify']['track_recs'])
    
    
    const getRecObj = (features) => {
        let origin = features['origin']
        let params = {
            seed_tracks: features['id'],
            danceability: origin['danceability'],
            acousticness: origin['acousticness'],
            instrumentalness: origin['instrumentalness'],
            liveness: origin['liveness'],
            valence: origin['valence'],
            loudness: origin['loudness'],
            tempo: origin['tempo'],
            key: origin['key'],
            speechiness : origin['speechiness'],
            mode : origin['mode'],
        }

        dispatch(getRecommendedTracks(params))

    }
    
    useEffect(()=> {
        if(featuresState['id'])
        {   
            let id = featuresState['id']
            let activeTrack = tracks[id]
            setTrack({...activeTrack})

            anime({
                targets: ['.info-bar > *',],
                translateX: [500, 0],
                scale: [0,1],
                easing: 'easeOutElastic(1, 1.1)',
                duration: 700,
                delay: anime.stagger(100),
            })



        }
        else
        {
            setTrack(null)
        }
    },[featuresState, tracks])


    useEffect(() => {
        if(Object.values(recState).length > 0)
        {
            setRecTracks([...Object.values(recState)])
            setHasRecs(true)
        }else{
            setHasRecs(false)
        }
    }, [recState])

    return(

        <div className="info-bar">
            {track && track['albumArt'] &&
                <div className="track-display"> 
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
            }
                {Object.values(featuresState['info']).length > 0 && 
                    <div className="info-features-container"> 
                        {
                        featuresState['info'].map( (item,i) => {
                            //console.log('item in loop', item)
                            return(
                                item !== undefined &&
                                <InfoBarItem key = {i} info = {item} /> 
                                )
                            })
                        }
                    </div>
                }

                {
            Object.values(featuresState['percent']).length > 0 && 
            <div className="percent-features-container"> 
                    {
                    featuresState['percent'].map((item, i) => {
                        return(
                        item&&
                        <InfoBarPercent key = {i}info= {item} />)
                    })
                     }
            </div>
                }

            <div className="rec-wrapper" > 
            {       
            Object.values(featuresState['percent']).length > 0 && !hasRecs &&
            <div>
                  <a className="btn-spotify" onClick={ () => {
                    getRecObj(featuresState)
                  }} >
                    Get Recommendations
                 </a>
            </div>        
            }
            {
                Object.values(featuresState['percent']).length > 0 && hasRecs &&
                <RecTrackList tracks={recTracks}/>
            }
            </div>

            {
                (!Object.values(featuresState['percent']).length || !featuresState['info']) && 
                <div className="info-placeholder">
                    <p>
                        Select a track on the left to see cool info about it!
                    </p>
                </div>
            }
        </div>
    )
}
export default InfoBar
import InfoBarItem from "./InfoBarItem"
import InfoBarPercent from "./InfoBarPrecent"
import './InfoBar.css'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const InfoBar = ({features, trackInfo}) => {
    
    const [track, setTrack] = useState({})

    let tracks = useSelector(state => state['spotify']['tracks'])
    let featuresState = useSelector(state =>state['spotify']['track_features'] )
    
    useEffect(()=> {
        if(featuresState['id'])
        {   
            let id = featuresState['id']
            let activeTrack = tracks[id]
            setTrack({...activeTrack})
        }
        else
        {
            setTrack(null)
        }
    },[featuresState, tracks])


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
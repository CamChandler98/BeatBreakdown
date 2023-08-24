import InfoBarItem from "./InfoBarItem"
import InfoBarPercent from "./InfoBarPrecent"
import './InfoBar.css'
import { useSelector } from "react-redux"

const InfoBar = ({features, trackInfo}) => {
    
    let tracks = useSelector(state => state['spotify']['tracks'])

    let track = tracks[features['id']]
    
    console.log('track' , track)
    console.log('feaures' , features)

    return(
        <div className="info-bar">


            {features['info'] && features['info'].map( (item,i) => {
                //console.log('item in loop', item)
                return(
                    item !== undefined &&
                    <InfoBarItem key = {i} info = {item} /> 
                 )
            })}

            {
                features['percent'] && features['percent'].map((item, i) => {
                    return(
                    item&&
                    <InfoBarPercent key = {i}info= {item} />)
                })
            }


            {
                (!features['percent'] || !features['info']) && 
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
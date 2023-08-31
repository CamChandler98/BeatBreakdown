import RangeSlider from 'react-bootstrap-range-slider';

const InfoBarPercent = ({info}) => {

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    function convertDB (db) {
        return Math.abs(Math.pow(10, (db/20)))
    }

    if(info.label === 'loudness')
    {
        info.value  = convertDB(info.value)
        // info.value = scale(parseInt(info.value), -60, 10, 0, 1)
    }

    
    info.label = capitalizeFirstLetter(info.label)
    return(
        info &&
        <div className="percent-feature">
            <label>
                {info.label}
            </label>
            <RangeSlider 
                value={info.value}
                min = {0}
                max = {1}
                step={.01}
                variant='success'
                tooltipStyle={
                    {
                        backgroundColor: '#29262a'
                    }
                }
            />
        </div>
    )
}
export default InfoBarPercent
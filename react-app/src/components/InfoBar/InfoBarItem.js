
const InfoBarItem = ({info}) => {
    function capitalizeFirstLetter(string) {
        console.log('string', string)
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const convertCap = (info) => {
        if(info.label.indexOf('_') !== -1){
            let splitString = info.label.split('_')

            splitString.forEach( (fragment,i) => {
                splitString[i] = capitalizeFirstLetter(fragment)
            })
            info.label = splitString.join(' ')
        }
        else{
            info.label = capitalizeFirstLetter(info.label)
        }
    }
    const convertTempo = (info) => {
        if(info.label === 'tempo')
        {
            info.value += ' BPM'
        }
    }
    const convertTime = (info) => {
        if(info.label === 'time_signature'){
            info.value = info.value + '/4'
        }
    }
    const convertMode = (info) => {
        if(info.label === 'mode'){
            console.log(info)
            switch(info.value){
                case 0:
                    info.value = 'Minor'
                case 1: 
                    info.value = "Major"
            }
        }
    }

    const convertKey = (info) => {
        if (info.label === 'key') {
            switch (info.value) {
                case -1:
                    info.value = 'None';
                    break;
                case 0:
                    info.value = 'C';
                    break;
                case 1:
                    info.value = 'C#';
                    break;
                case 2:
                    info.value = 'D';
                    break;
                case 3:
                    info.value = 'D#';
                    break;
                case 4:
                    info.value = 'E';
                    break;
                case 5:
                    info.value = 'F';
                    break;
                case 6:
                    info.value = 'F#';
                    break;
                case 7:
                    info.value = 'G';
                    break;
                case 8:
                    info.value = 'G#';
                    break;
                case 9:
                    info.value = 'A';
                    break;
                case 10:
                    info.value = 'A#';
                    break;
                case 11:
                    info.value = 'B';
                    break;
                default:
                    console.error("Invalid pitch class");
                    break;
            }
        }
    }
    convertTime(info)
    convertMode(info)
    convertKey(info)
    convertCap(info)
    //console.log('InfoBarItem', info)
    return(
        <div className="info-feature">
            <span>
                {`${info.label}: ${info.value}`}
            </span>
        </div>
    )
}

export default InfoBarItem
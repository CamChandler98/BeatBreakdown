const InfoBarItem = ({info}) => {

    //console.log('InfoBarItem', info)
    return(
        <div>
            <label>
                {info.label}
            </label>
            <span>
                {info.value}
            </span>
        </div>
    )
}

export default InfoBarItem
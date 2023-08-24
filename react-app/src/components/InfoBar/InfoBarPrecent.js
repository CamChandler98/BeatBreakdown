const InfoBarPercent = ({info}) => {
    return(
        info &&
        <div>
            <label>
                {info.label}
            </label>
            <input
                type="range"
                value={info.number}
            >
            </input>
        </div>
    )
}
export default InfoBarPercent
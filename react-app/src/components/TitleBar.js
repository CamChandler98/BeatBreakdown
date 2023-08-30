import styled from 'styled-components'

const BarStyle = styled.div`
    display: flex;
    // background-color: white;
    position: static;
    font-size: 30px;
    top:0;
    width:100%;
    min-height:60px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: .3rem;
    // box-shadow: 0px 0px 2px 0px;

    h1{
        font-size: 80px;
        // background-color: white;
        color: #a77bcb;
        font-family:  "Monoton", Arial, Helvetica, sans-serif;;
    }
`

const TitleBar = ({title}) => {


    return(
        <BarStyle>
            <h1>{title}</h1>
        </BarStyle>
    )
}


export default TitleBar

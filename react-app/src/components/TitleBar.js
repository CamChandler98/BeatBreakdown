import styled from 'styled-components'

const BarStyle = styled.div`
    display: flex;
    background-color: white;
    position: static;
    font-size: 30px;
    top:0;
    width:100%;
    min-height:60px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: .3rem;
    box-shadow: 0px 0px 2px 0px;

    h1{
        font-size: 30px;
        font-weight: bold;
        background-color: white;
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

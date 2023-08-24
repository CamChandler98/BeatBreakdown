import { useEffect, useState } from "react"
import styled from "styled-components"
const ScoresStyle = styled.div`
form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
button{
    height: 40px;
    background-color: #0d5ba7;
    color: white;
    font-size: 24px;
    border: none;
    border-radius: 10px;
}
button:hover{
    cursor: pointer;
    background-color: #054a8f;
}
.score-container{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    gap: 1rem;
    background-color: white;
    padding: 5%;
    max-width: 50rem;
    margin: 0 auto;
    margin-top: 3rem;
    border-radius: 7px;
}

.score-container h1{
    font-size: 28px;
    text-align: center;
}

.score-container input[type=number]{
    height: 2rem;
    text-align: center;
    font-size: 1.5rem;

}

.score-container input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
.percentile-container{
    display: flex;
    justify-content: space-around;
}

.percentile-container h2{
    text-align: center;
    font-size: 2rem;
}

.percentile-container span{
    font-size: 3rem;
    margin-top: auto;
}
.percentile-container>div{
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
    border-radius: 20px;
    width:50%;
    padding: 2rem;
    align-items:center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    min-height: 10rem;
    margin: 1rem;
}

.error{
    color: red;
}
`
const Scores = () => {

    const [candidateId, setCandidateId] = useState('')
    const [codingScore, setCodingScore] = useState(0)
    const [displayCodingScore, setDisplayCodingScore] = useState(0)
    const  [communicationScore, setCommunicationScore] = useState(0)
    const [displayCommunicationScore, setDisplayCommunicationScore] = useState(0)
    const  [error, setError] = useState('')


    const handleCandidate = (e) => {
        if(error){
            setError('')
        }
        setCandidateId(e.target.value)
    }

    const updateOnSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`/api/score/candidate/${candidateId}`)
        const data = await res.json()
        //console.log(data)
        if(data['error']){
            setError(data['error'])
            setCodingScore(0)
            setDisplayCodingScore(0)
            setCommunicationScore(0)
            setDisplayCommunicationScore(0)
            setCandidateId('')
        }
        if(data['coding'] !== undefined){
            setDisplayCodingScore(0)
            setCodingScore(Math.round(data['coding']))
        }
        if(data['communication'] !== undefined){
            setDisplayCommunicationScore(0)
            setCommunicationScore(Math.round(data['communication']))
        }
}


    useEffect(() => {
        let interval = setInterval(()=> {
            setDisplayCodingScore(prev => prev + 1)
        }, 25)

        if(displayCodingScore >= codingScore){
            clearInterval(interval)
        }
        return () =>{
            clearInterval(interval)
        }
    }, [codingScore, displayCodingScore])

    useEffect(() => {
        let interval = setInterval(()=> {
            setDisplayCommunicationScore(prev => prev + 1)
        }, 25)

        if(displayCommunicationScore >= communicationScore){
            clearInterval(interval)
        }
        return () =>{
            clearInterval(interval)
        }
    }, [communicationScore, displayCommunicationScore])

    useEffect(() => {

    }, [error])





    return (
        <ScoresStyle>
        <div className= 'score-container'>
            <h1 >
                Enter Your Candidate ID to see how you stack up against people from similar companies!
            </h1>
            <form onSubmit = {updateOnSubmit}>
                <input  min = '1' type = 'number' value = {candidateId} placeholder = 'enter id' onChange = {handleCandidate}></input>
                <button type = 'submit'>See Scores</button>
            </form>
                {error && <div>
                        <span className = 'error'>{error}</span>
                    </div>}
            <div className = 'percentile-container'>

                <div>
                    <h2>Coding Percentile</h2>

                    {<span>
                        {error ? 'err' : codingScore !== undefined ? displayCodingScore :  '?'}
                    </span>}
                </div>

                <div>
                    <h2>Communication Percentile</h2>

                    <span>
                        {error ? 'err': communicationScore !== undefined ? displayCommunicationScore : '?'}
                    </span>
                </div>
            </div>
        </div>
        </ScoresStyle>
    )

}


export default Scores

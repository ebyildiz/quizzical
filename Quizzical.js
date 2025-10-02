import React from "react"
import {useState, useEffect} from "react"
import QuizPage from "./QuizPage.js"

export default function Quizzical() {
    const [questions, setQuestions] = useState([])
    const [clickedOptions, setClickedOptions] = useState([])
    
    useEffect(() => {
        setClickedOptions(questions.map(questionObj => {
        return ({question:questionObj.question, clicked:"", correct:false })}))
        }, [questions]);
    
    function startQuiz() {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        .then(response => response.json())
        .then(data => setQuestions(data.results))
    }
    
    
    return (
        <main>
        <div className="blob-shape right"/>
        { questions?.length===0 ? 
            <div className="first-page">
                <div className="blob-shape right"/>
                    <h1>Quizzical</h1>
                    <p>Test your knowledge!</p>
                    <button onClick={startQuiz}>Start Quiz</button>
            </div>
            
            :
            
            <div className ="second-page">
                <QuizPage questions={questions} startQuiz={startQuiz} clickedOptions={clickedOptions} setClickedOptions={setClickedOptions} />
            </div>
            
        }
        <div className="blob-shape left"/>
        </main>
    )
}
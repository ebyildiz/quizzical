import React from "react"
import Question from "./Question.js"
import {useState, useEffect} from "react"


export default function QuizPage({questions, startQuiz, setClickedOptions, clickedOptions}) {
    
    // state variables
    const [showAnswers, setShowAnswers] = useState(false)
    let score = 0
    // derived variables
    for(let i=0; i<clickedOptions.length; i++){
        if (clickedOptions[i].clicked && clickedOptions[i].correct){
            score++
        }
    }
    
    const questionElements = questions.map((questionObj) => {
        return(<Question  
            key = {questionObj.correct_answer}
            question={questionObj.question} 
            correctAnswer={questionObj.correct_answer} 
            incorrectAnswers={questionObj.incorrect_answers} 
            setClickedOptions={setClickedOptions}
            showAnswers = {showAnswers}
            clickedOptions = {clickedOptions}
            /> )
    
    })
    
    
    const allQuestionsChecked = clickedOptions.every(item => item.clicked)
    
    
    // functions
    
    function showAnswerSheet() {
        setShowAnswers(true)
    }
    
    function restartGame() {
        startQuiz()
        setShowAnswers(false)
    }
    
    return (
        <section className="questions">
            {questionElements}
            
        <section className="end-of-quiz">
            { !showAnswers && allQuestionsChecked &&
                <button className="check-answers-button" onClick={showAnswerSheet}>Check answer </button>
            }
            {showAnswers && 
                <div className="score-container">
                    <p>You scored {score}/{questions.length} correct answers</p>
                    <button className="check-answers-button" onClick={restartGame}>Play again</button>
                </div>
            }
        
        </section>

        </section>
        
    )
}
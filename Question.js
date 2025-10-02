import React from "react"
import {useState} from "react"

function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    
function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
    
export default function Question({question, correctAnswer, incorrectAnswers, setClickedOptions, showAnswers, clickedOptions}) {
    
    const decodedQ = decodeHtml(question)
    const decodedCorrect = decodeHtml(correctAnswer)
    
    const answers = [...incorrectAnswers, correctAnswer]
    const [allAnswers, setAllAnswers] = useState(shuffleArray(answers.map(answer => decodeHtml(answer))))
    
    
    function selectOption(e) {
        const selected = e.target.innerText
        
        setClickedOptions((prev) => {
            return(prev.map(clickedItem => {
                if(clickedItem.question===question){
                return({...clickedItem, clicked:selected, correct:correctAnswer===selected})
                }
                else{
                    return(clickedItem)
                }
            }))

        
    })
    }
    
    const optionElements = allAnswers.map(option => 
    {   const isSelected = clickedOptions.some(item => item.question===question && item.clicked===option)
        const correct = option===decodedCorrect
        const incorrect = !(option===decodedCorrect)
        
        const selectedClass = (!showAnswers && isSelected) ? "selected " : ""
        const greenClass = (correct && showAnswers) ? "green" : ""
        const redClass = (isSelected && incorrect && showAnswers) ? "red" : ""
        const allClasses = "option " + selectedClass + greenClass + redClass
        return(
            <button className={allClasses} onClick={selectOption} disabled={showAnswers}>{option}</button> 
        )

    
    })
    
    return (
        <div className="question-container">
            <p>{decodedQ}</p>
        <div className="options">
        {optionElements}
        </div>
        
        </div>
    )
}
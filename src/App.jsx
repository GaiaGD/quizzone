import React from 'react'

import './App.css'
import Question from './components/Question';
import Categorybubble from './components/Categorybubble';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import categoriesList from './components/categories.json'
import {decode} from 'html-entities';


export default function App() {

  const [allShuffledQuiz, setAllShuffledQuiz] = React.useState([])
  const [checkedAnswers, setCheckedAnswers] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [answersCounter, setAnswersCounter] = React.useState(0)
  const [newQuiz, setNewQuiz] = React.useState(false)
  const [category, setCategory] = React.useState(0)

  let howManyQuestion = 5

  let categorieslistPrint = categoriesList.map(category => {
    return <Categorybubble category={category.category} value={category.value} selectCategoryAndStartQuiz={selectCategoryAndStartQuiz}/>
  })
  
  function selectCategoryAndStartQuiz(event){
      setCategory(event.target.dataset.a)
      setNewQuiz(prevNewQuiz => !prevNewQuiz)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }


  // getting ALL the questions and answers in a big array
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://opentdb.com/api.php?amount=${howManyQuestion}&category=${category}&difficulty=easy&type=multiple`)
      const json = await data.json();
      // set state with the result
      let dataFromAPI = json.results

      // randomize all questions inside a state here so it doesn't reshuffle
      let dataShuffled = dataFromAPI.map(question => {
        let quizQuestion = decode(question.question)

        let toShuffle = [
            { copy: decode(question.correct_answer),
              isCorrect: true,
              isSelected: false,
              id: nanoid(),
              key: nanoid()
            },
            { copy: decode(question.incorrect_answers[0]),
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
              key: nanoid()
            },
            { copy: decode(question.incorrect_answers[1]),
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
              key: nanoid()
            },
            { copy: decode(question.incorrect_answers[2]),
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
              key: nanoid()
            }
        ]

        // shuffling the options
        let shuffledOptions = toShuffle
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
        let questionsAndOptions = {quizQuestion, shuffledOptions}
        return (
          questionsAndOptions
          )
      })
      setAllShuffledQuiz(dataShuffled)
    }
    fetchData()
    .catch(console.error)
  }, [newQuiz] )

  // mapping the api results in 4 components
  let gameQuestions = allShuffledQuiz.map(question => {
    // mapping the api results in 4 components
    return (
      <div className='question-container'>
        <div className="title">
            <h3>{question.quizQuestion}</h3>
        </div>
        <div className="answers">
          <Question 
            id={question.shuffledOptions[0].id}
            key={question.shuffledOptions[0].key}
            copy={question.shuffledOptions[0].copy}
            checked={checkedAnswers}
            selected={question.shuffledOptions[0].isSelected}
            correct={question.shuffledOptions[0].isCorrect}
            toggleSelected={toggleSelected}
          />
          <Question 
            id={question.shuffledOptions[1].id}
            key={question.shuffledOptions[1].key}
            copy={question.shuffledOptions[1].copy}
            checked={checkedAnswers}
            selected={question.shuffledOptions[1].isSelected}
            correct={question.shuffledOptions[1].isCorrect}
            toggleSelected={toggleSelected}
          />
          <Question 
            id={question.shuffledOptions[2].id}
            key={question.shuffledOptions[2].key}
            copy={question.shuffledOptions[2].copy}
            checked={checkedAnswers}
            selected={question.shuffledOptions[2].isSelected}
            correct={question.shuffledOptions[2].isCorrect}
            toggleSelected={toggleSelected}
          />
          <Question 
            id={question.shuffledOptions[3].id}
            key={question.shuffledOptions[3].key}
            copy={question.shuffledOptions[3].copy}
            checked={checkedAnswers}
            selected={question.shuffledOptions[3].isSelected}
            correct={question.shuffledOptions[3].isCorrect}
            toggleSelected={toggleSelected}
          />
        </div>
      </div>
    )
  })


  // clicking the option to select the answers
  function toggleSelected(id){
    setAllShuffledQuiz(prevAllShuffledQuiz => prevAllShuffledQuiz.map(question => {
      // find right question to edit by index
      const i = question.shuffledOptions.findIndex(e => e.id === id)
      
      if (i > -1) {
        // this has to be an array returning all the 4 options the same BUT the one with the selected index i will change the selected
        let arrayWithSelection = question.shuffledOptions.map(option => {
          return option.id === id ? {...option, isSelected: !option.isSelected} : {...option, isSelected: false}
        })
        // shuffledOptions = i need to define a variable defined elsewhere or it's inaccessible
        return {...question, shuffledOptions: arrayWithSelection}
      } else {
        // leave this question as it is
      return question
    }
    }))
  }

  function checkAllAnswers(){
    // disable button if not all of them are selected
    setCheckedAnswers(prevCheckedAnswers => !prevCheckedAnswers)
    allShuffledQuiz.map(question => {
    // find and check: if selected and correct add green to option, (and set counter of right answers), otherwise add red and green (inside components)
    let optionSelected = question.shuffledOptions.find(option => option.isSelected)
    // counting the right answers
    optionSelected.isCorrect && setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers+1)
    })
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  function getNewQuiz(){
    setNewQuiz(prevNewQuiz => !prevNewQuiz)
    setCheckedAnswers(prevCheckedAnswers => !prevCheckedAnswers)
    setCorrectAnswers(0)
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  
    return (
        <div>
          <div className="main-container">
            {correctAnswers === howManyQuestion && <Confetti />}
            {!newQuiz ? 

                <div className='intro fade-in'>
                  <div className='title text_shadows'>
                    <h1 className='get'><span className='star'>*</span> Get <span className='star'>*</span></h1>
                    <h1 className='quizzed'>Quizzed!</h1>
                  </div>

                  <div className='categories-container'>
                    {categorieslistPrint}
                  </div>
                </div> 
                :

                <div className='fade-in'>
                  <div className='title'>
                    <h1>* And the questions are *</h1>
                  </div>

                  {allShuffledQuiz.length > 0 && gameQuestions}
                  {checkedAnswers && 
                    <div className='results'>
                      <h3>Your scored {correctAnswers} out of {howManyQuestion} correct answers.</h3>
                    </div>
                  }
                  {!checkedAnswers ?
                  // check answers
                  <button className='checkAnswers'
                    onClick={checkAllAnswers}>
                    Check Answers
                  </button> :
                  // click for new game
                  <button className='checkAnswers'
                    onClick={getNewQuiz}>
                    Another quiz!
                  </button>}
                </div>
            } 
          </div>
        </div>
      )
}

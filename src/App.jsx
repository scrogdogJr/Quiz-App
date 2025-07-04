import { useState } from 'react'
import './App.css'
import Header from './components/header'
import QuestionSelector from './components/QuestionSelector'
import Question from './components/Question'
import AnswerFeedback from './components/answerFeedback'

function App() {

  const [questionValue, setQuestionValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');

  if (!questionValue) {
    return (
      <div className="main-container">
        <Header/>
        <QuestionSelector setQuestionValue={setQuestionValue} setNameValue={setNameValue} nameValue={nameValue}/>
      </div>
    );
  }

  else if (!questionAnswer) {
    return (
      <div>
        <Question question={questionValue} setQuestionAnswer={setQuestionAnswer} />
      </div>
    );
  }
  else if (questionAnswer) {
    return (
      <div>
        <AnswerFeedback questionAnswer={questionAnswer} setQuestionAnswer={setQuestionAnswer} setQuestionValue={setQuestionValue} questionValue={questionValue} nameValue={nameValue} />
      </div>
    );
  }
}

export default App

import { useState } from 'react';
import styles from './Question.module.css';

function Question(props) {

    let correctIndex = Math.floor(Math.random() * (props.question.results[0].incorrect_answers.length + 1));
    let incorrect_answers = [...props.question.results[0].incorrect_answers];
    incorrect_answers.splice(correctIndex, 0, props.question.results[0].correct_answer);
    let answers = incorrect_answers;

    
    let tempAnswer = '';
    const [error, setError] = useState('');

    const handleAnswerChange = (event) => {
        tempAnswer = event.target.value;
    }

    const validateForm = () => {
        if (tempAnswer.trim() === '') {
            setError('Please select an answer.');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        props.setQuestionAnswer(tempAnswer);
        tempAnswer = '';
    }

    if (!props.question || !props.question.results || props.question.results.length === 0) {
        return <h1>Loading...</h1>;
    }

    else {
        return (
            <div className={styles.questionContainer}>
                <header className={styles.questionHeader}>
                    <h1>Question</h1>
                    <div className={styles.questionDetails}>
                        <h2>Category: {props.question.results[0].category}</h2>
                        <h2>Difficulty: {props.question.results[0].difficulty}</h2>
                    </div>
                </header>

                <div className={styles.questionText}>
                    <p>{props.question.results[0].question}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.choices}>
                        {answers.map( (answer) => (
                            <label key={answer}>
                                <input type="radio" name="answer" value={answer} onChange={handleAnswerChange} />
                                &nbsp;{answer}
                            </label>
                        ))}
                    </div>

                    <button type="submit">Submit Answer</button>
                </form>

                {error && <div style={{color: 'red'}}>{error}</div>}
            </div>
        );
    }
}

export default Question;

import styles from "./AnswerFeedback.module.css";

function AnswerFeedback(props) {
    const isCorrect = props.questionValue.results[0].correct_answer === props.questionAnswer

    const nextQuestion = () => {
        props.setQuestionValue('');
        props.setQuestionAnswer('');
    }

    return (
        <div className={styles.questionContainer}>
            <header className={styles.questionHeader}>
                {isCorrect ? (<h1 className={styles.correctHeader}>Correct, {props.nameValue}!</h1>) : (<h1 className={styles.incorrectHeader}>Incorrect, {props.nameValue}</h1>)}
            </header>

            <div className={styles.questionText}>
                <p>{props.questionValue.results[0].question}</p>
            </div>

            {isCorrect ? (
                <div className={styles.correctAnswer}>
                    <p>&nbsp;&bull; {props.questionAnswer}</p>
                </div>
            ): (
                <div className={styles.choices}>
                    <div className={styles.incorrectAnswer}>
                        <p>&nbsp;&bull; {props.questionAnswer}</p>
                    </div>

                    <div className={styles.correctAnswer}>
                        <p>&nbsp;&bull; {props.questionValue.results[0].correct_answer}</p>
                    </div>
                </div>
            )}
            <button className={styles.nextButton} onClick={nextQuestion}>Next Question</button>
        </div>
    );
}



export default AnswerFeedback;
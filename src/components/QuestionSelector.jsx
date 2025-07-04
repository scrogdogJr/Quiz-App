import { useState } from 'react';
import styles from './QuestionSelector.module.css';

function QuestionSelector(props) {
    const [categoryValue, setCategoryValue] = useState('');
    const [difficultyValue, setDifficultyValue] = useState('');
    const [error, setError] = useState('');

    const handleNameChange = (event) => {
        props.setNameValue(event.target.value);
    }

    const handleCategoryChange = (event) => {
        setCategoryValue(event.target.value);
    }

    const handleDifficultyChange = (event) => {
        setDifficultyValue(event.target.value);
    }

    const validateForm = () => {

        if (props.nameValue.trim() === ''){
            setError('Please enter your name');
            return false;
        }

        if (categoryValue.trim() === '' || difficultyValue.trim() === '') {
            setError('Please select both category and difficulty.');
            return false;
        }
        setError('');
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()){
            return;
        }

        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=1&category=${categoryValue}&difficulty=${difficultyValue}&type=multiple`);

            if (!response.ok) {
                throw new Error('Failed to fetch question');
            }

            const data = await response.json();

            props.setQuestionValue(data);


        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <div className={styles.formContainer}>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Enter your Name</label>
                <input type='text' id='name' value={props.nameValue} onChange={handleNameChange} placeholder='Name'></input>

                <h2>Select a Question:</h2>

                <div className={styles.questionContainer}>
                    <div className={styles.selectorContainer}>
                        <label htmlFor='category'>Category:</label>
                        <select
                            id='category'
                            value={categoryValue}
                            onChange={handleCategoryChange}
                        >
                            <option value=''>--Please choose an option--</option>
                            <option value='18'>Science: Computers</option>
                            <option value='21'>Sports</option>
                            <option value='16'>Entertaiment: Board Games</option>
                            <option value='20'>Mythology</option>
                        </select>
                    </div>

                    <div className={styles.selectorContainer}>
                        <label htmlFor='difficulty'>Difficulty:</label>
                        <select
                            id='difficulty'
                            value={difficultyValue}
                            onChange={handleDifficultyChange}
                        >
                            <option value=''>--Please choose an option--</option>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                </div>

                <button type='submit'>Get Question</button>
            </form>

            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}
export default QuestionSelector;
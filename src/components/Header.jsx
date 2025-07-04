import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <div>
                <h1>Welcome to Trivia Rush!!</h1>
                <h2>Test your trivia knowledge!</h2>
            </div>
        </header>
    )
}

export default Header;
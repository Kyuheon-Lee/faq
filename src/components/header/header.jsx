import styles from "./header.module.css";

function Header() {
    return (
        <div className={styles.root}>
            <h1 className={styles.title}>자주 묻는 질문</h1>
            <h3 className={styles.subtitle}>
                궁금하신 내용을 빠르게 찾아보세요
            </h3>
        </div>
    );
}

export default Header;

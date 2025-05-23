import { useContext, useCallback } from "react";
import { FaqContext } from "../../App";
import styles from "./Search.module.css";

function Search() {
    const { searchInput, setSearchInput, setSearchQuery } =
        useContext(FaqContext);

    const handleChange = useCallback(
        (value) => {
            setSearchInput(value);
        },
        [setSearchInput]
    );

    const handleClear = useCallback(() => {
        setSearchInput("");
        setSearchQuery("");
    }, [setSearchInput, setSearchQuery]);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter") {
                setSearchQuery(searchInput);
            }
        },
        [searchInput, setSearchQuery]
    );

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                value={searchInput}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="검색어를 입력하세요"
            />
            {searchInput && (
                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                    aria-label="입력 내용 지우기"
                >
                    ×
                </button>
            )}
            <span
                className={styles.icon}
                onClick={() => setSearchQuery(searchInput)}
            >
                🔍
            </span>
        </div>
    );
}

export default Search;

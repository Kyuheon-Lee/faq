import { useEffect, useState } from "react";
import styles from "./List.module.css";

function List({ items }) {
    const [openFaqId, setOpenFaqId] = useState(null);

    useEffect(() => {
        setOpenFaqId(null);
    }, [items]);

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    return (
        <div className={styles.container}>
            {items.map((faq) => (
                <div key={faq.id} className={styles.item}>
                    <div
                        className={styles.row}
                        onClick={() => toggleFaq(faq.id)}
                    >
                        <span className={styles.category}>
                            {faq.categoryName}
                        </span>
                        <span className={styles.subcategory}>
                            {faq.subCategoryName}
                        </span>
                        <span className={styles.question}>{faq.question}</span>
                        <span className={styles.icon}>
                            {openFaqId === faq.id ? "▲" : "▼"}
                        </span>
                    </div>
                    <div
                        className={`${styles.answerWrapper} ${
                            openFaqId === faq.id ? styles.open : ""
                        }`}
                    >
                        <div
                            className={styles.answer}
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default List;

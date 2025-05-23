import { useContext } from "react";
import { FAQ_TABS } from "../../constants";
import { FaqContext } from "../../App";
import styles from "./Tabs.module.css";

function Tabs({ onChange }) {
    const { selectedTab } = useContext(FaqContext);

    return (
        <ul className={styles.faqTabs}>
            {FAQ_TABS.map((tab) => (
                <li
                    key={tab.id}
                    className={`${styles.faqTab} ${
                        selectedTab.id === tab.id ? styles.selected : ""
                    }`}
                    onClick={() => onChange(tab)}
                >
                    {tab.text}
                </li>
            ))}
        </ul>
    );
}

export default Tabs;

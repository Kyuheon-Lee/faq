import { useContext } from "react";
import { useMemo } from "react";
import styles from "./Filter.module.css";
import { FaqContext } from "../../App";
function Filter({ filters }) {
    const { selectedFilter, setSelectedFilter } = useContext(FaqContext);
    const filterOptions = useMemo(
        () => [{ categoryID: "ALL", name: "전체" }, ...filters],
        [filters]
    );

    return (
        <div className={styles.container}>
            {filterOptions.map((filter, index) => (
                <button
                    key={filter.categoryID ?? `fallback-key-${index}`}
                    className={`${styles.filterTag} ${
                        filter.categoryID === selectedFilter
                            ? styles.active
                            : ""
                    }`}
                    onClick={() => setSelectedFilter(filter.categoryID)}
                >
                    {filter.name}
                </button>
            ))}
        </div>
    );
}

export default Filter;

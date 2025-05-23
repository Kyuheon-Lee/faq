import { createContext, useCallback, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/header/header";
import Tabs from "./components/tabs/tabs";
import Search from "./components/search/search";
import Filter from "./components/filter/filter";
import List from "./components/list/list";
import { FAQ_TABS } from "./constants";
import styles from "./App.module.css";
import { useFilters, useFaqs } from "./useApi";

export const FaqContext = createContext();

function App() {
    const [selectedTab, setSelectedTab] = useState(FAQ_TABS[0]);
    const [selectedFilter, setSelectedFilter] = useState("ALL");
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: filters = [] } = useFilters(selectedTab.id);
    const { data: faqs = [] } = useFaqs(
        selectedTab.id,
        selectedFilter,
        searchQuery
    );

    const handleTabChange = useCallback((tab) => {
        setSelectedTab(tab);
        setSelectedFilter("ALL");
        setSearchInput("");
        setSearchQuery("");
    }, []);

    const contextValue = useMemo(
        () => ({
            selectedTab,
            selectedFilter,
            searchInput,
            searchQuery,
            setSearchInput,
            setSearchQuery,
            setSelectedFilter,
        }),
        [selectedTab, selectedFilter, searchInput, searchQuery]
    );

    return (
        <FaqContext.Provider value={contextValue}>
            <div className={styles.fullScreenWrapper}>
                <div className={styles.content}>
                    <Header />
                    <Tabs onChange={handleTabChange} />
                    <Search />
                    <Filter filters={filters} onSelect={setSelectedFilter} />
                    <List items={faqs} />
                </div>
            </div>
        </FaqContext.Provider>
    );
}

export default function AppWrapper() {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}

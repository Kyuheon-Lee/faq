import { useQuery } from "@tanstack/react-query";
import { fetchFilter, fetchList } from "./api";

export function useFilters(tabId) {
    return useQuery({
        queryKey: ["filters", tabId],
        queryFn: () => fetchFilter(tabId),
    });
}

export function useFaqs(tabId, filterId, searchQuery) {
    return useQuery({
        queryKey: ["faqs", tabId, filterId, searchQuery],
        queryFn: () => fetchList(tabId, filterId, searchQuery),
    });
}

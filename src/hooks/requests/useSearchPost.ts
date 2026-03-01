import { useState, useCallback, useRef, useEffect, useTransition } from 'react';
import { searchPosts } from '@/actions/search';

const defaultOptions: SearchOptions = {
    searchTitle: true,
    searchContent: true,
};

const defaultFilters: SearchFilters = {
    nsfw: false
};

export function useSearchPost(scrollAreaRef: React.RefObject<HTMLElement | null>, delay = 150) {
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState<SearchOptions>(defaultOptions);
    const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
    const [results, setResults] = useState<PostResponse[]>([]);
    const [isSearching, setIsSearching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [, startTransition] = useTransition();

    const lastRequestId = useRef(0);

    const toggleOption = (key: keyof SearchOptions) => {
        setOptions(prev => {
            const newOptions = { ...prev };
            newOptions[key] = !newOptions[key];
            if (Object.values(newOptions).every(val => !val)) {
                return defaultOptions;
            } else {
                return newOptions;
            }
        });
    };

    const toggleFilter = (key: keyof SearchFilters) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const executeSearch = useCallback(async (currentQuery: string, currentOptions: SearchOptions, currentFilters: SearchFilters) => {
        const currentId = ++lastRequestId.current;
        setIsSearching(true);
        setError(null);
        startTransition(async () => {

            try {
                const response = await searchPosts(currentQuery, currentOptions, currentFilters);
                if (response.status === 'success') {
                    if (currentId === lastRequestId.current) {
                        setResults(response.data);
                        scrollAreaRef?.current?.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    throw new Error(response.message || "Failed to fetch results");
                }
            } catch (err: unknown) {
                if (currentId === lastRequestId.current) {
                    setError((err instanceof Error ? err.message : undefined) || "Search failed");
                    setResults([]);
                }
            } finally {
                if (currentId === lastRequestId.current) {
                    setIsSearching(false);
                }
            }
        });
    }, [scrollAreaRef]);

    // Debounce Effect: Watch both query AND options
    useEffect(() => {
        const timer = setTimeout(() => {
            executeSearch(query, options, filters);
        }, delay);

        return () => clearTimeout(timer);
    }, [query, options, filters, delay, executeSearch]);

    return {
        query,
        setQuery,
        options,
        toggleOption,
        filters,
        toggleFilter,
        results,
        isSearching,
        error,
        performSearch: () => executeSearch(query, options, filters)
    };
}
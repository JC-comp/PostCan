import { useEffect, useRef } from "react";

export default function useLoadMore(loadMore: () => void, state: FetchCommentState) {
    const observerTarget = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the target is visible
                rootMargin: '100px' // Start loading 100px before the user actually reaches the bottom
            }
        );

        const currentTarget = observerTarget.current;
        if (!currentTarget || state.status !== 'success' || !state.hasMore)
            return;
        
        const timeout = setTimeout(() => {
            observer.observe(currentTarget);
        }, 500)
        return () => {
            clearTimeout(timeout);
            observer.unobserve(currentTarget);
        };
    }, [loadMore, state.status, state.hasMore]);
    return observerTarget;
}
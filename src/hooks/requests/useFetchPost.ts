import { useState, useCallback, useEffect, useRef, useTransition } from 'react';
import { getPost } from '@/actions/post';

export default function useFetchPost(postId: string) {
    const [post, setPost] = useState<PostDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [, startTransition] = useTransition();

    const lastRequestId = useRef(0);

    const fetchPost = useCallback(async () => {
        if (!postId) {
            setError("請選擇一篇文章");
            return;
        }

        const currentId = ++lastRequestId.current;
        setIsLoading(true);
        setError(null);
        setErrorCode(null);
        startTransition(async () => {
            try {
                const response = await getPost(postId);

                // Only update state if this is still the most recent request
                if (currentId === lastRequestId.current) {
                    if (response.status === 'success') {
                        setPost(response.data);
                    } else {
                        setErrorCode(response.statusCode);
                        throw new Error(response.message || "無法取得文章內容");
                    }
                }
            } catch (err: unknown) {
                console.error(err);
                if (currentId === lastRequestId.current) {
                    setError((err instanceof Error ? err.message : undefined) || "載入失敗");
                }
            } finally {
                if (currentId === lastRequestId.current) {
                    setIsLoading(false);
                }
            }
        });
    }, [postId]);

    // Automatically fetch when postId changes
    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

    return {
        post,
        isLoading,
        error,
        errorCode,
        refresh: fetchPost, // Allows manual retry
    };
}
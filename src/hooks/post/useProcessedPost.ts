import { useMemo } from 'react';

export default function useProcessedPost(post: PostResponse) {
    return useMemo(() => {
        return {
            ...post,
            author: {
                ...post.author,
                name: post.author?.name || "匿名"
            },
            createdAt: new Date(post.createdAt).toLocaleString()
        };
    }, [post]);
}
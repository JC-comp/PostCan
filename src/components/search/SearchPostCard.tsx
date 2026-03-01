import React from 'react';
import useProcessedPost from '@/hooks/post/useProcessedPost';
import PostAvatar from '@/components/post/PostAvatar';

interface SearchPostCardProps {
    post: PostResponse;
    onOpen: (post: PostResponse) => void
}
function SearchPostCard({ post, onOpen }: SearchPostCardProps) {
    const formattedPost = useProcessedPost(post);
    return <article
        className="group cursor-pointer bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-200"
        onClick={() => onOpen(post)}
    >
        <div className="flex items-center gap-3 mb-4">
            <PostAvatar author={formattedPost.author} size="lg" />
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {formattedPost.author.name}
                </span>
                <span className="text-xs text-gray-500">{formattedPost.createdAt}</span>
            </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            <span
                dangerouslySetInnerHTML={{ __html: formattedPost._formatted?.title || formattedPost.title }}
                className="[&>em]:text-blue-600 [&>em]:not-italic [&>em]:font-black"
            />
        </h2>

        <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 text-sm">
            <span
                dangerouslySetInnerHTML={{ __html: formattedPost._formatted?.excerpt || formattedPost.excerpt }}
                className="[&>em]:bg-blue-100 dark:[&>em]:bg-blue-900/40 [&>em]:text-blue-700 dark:[&>em]:text-blue-300 [&>em]:not-italic [&>em]:px-0.5"
            />
        </p>

        <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {formattedPost.forum}
            </span>
        </div>
    </article>
}
export default React.memo(SearchPostCard);
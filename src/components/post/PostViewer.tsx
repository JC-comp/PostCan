import { useRef } from "react";
import useProcessedPost from "@/hooks/post/useProcessedPost";
import CommentViewer from "@/components/comment/CommentViewer";
import PostAvatar from "./PostAvatar";
import { PostContent } from "./PostContent";

interface PostViewerProps {
    post: PostResponse;
    onClose: () => void;
}

const PostHeader = ({ post, onClose }: { post: PostResponse; onClose: () => void }) => {
    return <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md px-5 pt-5 pb-2 border-b border-gray-100 dark:border-gray-800 flex justify-between">
        <div className="flex flex-col">
            <PostAuthor post={post} />
            {/* Badges */}
            <div className="ml-6 flex gap-2 items-center">
                <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase text-nowrap">
                    {post.forum}
                </span>
                {post.nsfw && (
                    <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase text-nowrap">NSFW</span>
                )}
            </div>
        </div>
        {/* Close Button */}
        <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-light cursor-pointer self-start"
        >
            ✕
        </button>
    </div>
}

const PostAuthor = ({ post }: { post: Post }) => {
    return <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
        <PostAvatar author={post.author} size="md" />
        <span className="font-medium text-gray-700 dark:text-gray-300 ml-1">{post.author.name}</span>
        <span>•</span>
        <span>{post.createdAt}</span>
    </div>
}

export default function PostViewer({ post, onClose }: PostViewerProps) {
    const formattedPost = useProcessedPost(post);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    return <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-all"
        onClick={onClose}
    >
        <div
            className="bg-white dark:bg-gray-950 overflow-hidden w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Sticky Header */}
            <PostHeader post={formattedPost} onClose={onClose} />
            {/* Body */}
            <div ref={scrollAreaRef} className="px-6 pb-6 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-track-[#1e1e1e] scrollbar-thumb-[#3e4042] hover:scrollbar-thumb-[#4e5052] overflow-y-auto overscroll-contain">
                {/* Content */}
                <div className="relative my-4">
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                        <PostContent postId={post.id} />
                    </div>
                </div>
                <hr className="border-gray-100 dark:border-gray-800 mb-6" />
                {/* Comments */}
                <CommentViewer postId={formattedPost.id} scrollAreaRef={scrollAreaRef} />
            </div>
        </div>
    </div>
}
import { useFetchComments } from "@/hooks/requests/useFetchComment";
import { Interweave } from "interweave";
import { Ref, RefObject, useCallback } from "react";
import { UrlMatcher } from "interweave-autolink";
import { ErrorResult, UnAuthorizedResult } from "@/components/error";
import useLoadMore from "@/hooks/comment/useLoadMore";
import { useComingSoon } from "@/context/ModalContext";
import PostAvatar from "@/components/post/PostAvatar";
import VersionButton from "@/components/content/VersionButton";
import { ImageMatcher } from "@/components/content/matcher/ImageMatcher";
import { VideoMatcher } from "@/components/content/matcher/VideoMatcher";

function CommentHeader({ comment }: { comment: Comment }) {
    return <div className="flex justify-between items-start">
        {/* Name */}
        <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                {comment.author.name}
            </span>
        </div>
        {/*  Like Count */}
        <div className="flex items-center gap-3 text-gray-400">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="text-xs">{comment.likeCount}</span>
            </button>
        </div>
    </div>
}

function CommentCard({ comment }: { comment: Comment }) {
    const { showModal } = useComingSoon();
    return <div className="flex gap-3 py-4 border-b border-gray-100 dark:border-gray-800">
        {/* Left: Avatar */}
        <PostAvatar author={comment.author} size='lg' />

        {/* Right: Content Area */}
        <div className="flex-1 min-w-0">
            {/* Header */}
            <CommentHeader comment={comment} />
            {/* Main Text */}
            {
                comment.content ?
                    <div className="my-2 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200 [&_a]:text-blue-500 [&_a]:transition-colors [&_a:hover]:text-blue-700 [&_a:hover]:underline">
                        <Interweave
                            content={comment.content}
                            matchers={[new ImageMatcher('img'), new VideoMatcher('video'), new UrlMatcher('url')]}
                            newWindow={true}
                        />
                    </div>
                    :
                    <span className="my-2 text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
                        這則留言已被刪除
                    </span>
            }

            {/* Footer: Metadata */}
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="font-bold text-blue-500">B{comment.floor}</span>
                    <time>{new Date(comment.createdAt).toLocaleString()}</time>
                    {comment.version_count > 1 && <VersionButton version_count={comment.version_count} />}
                </div>
            </div>
            {/* Sub-comment Section */}
            {comment.subCommentCount! > 0 && (
                <div className="">
                    <button
                        onClick={showModal}
                        className="text-sm font-bold text-gray-500 hover:underline cursor-pointer py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        查看其他 {comment.subCommentCount} 則回覆
                    </button>
                </div>
            )}
        </div>
    </div>
}

interface CommentViewerProps {
    postId: string;
    scrollAreaRef: RefObject<HTMLDivElement | null>;
}

const ObserverPlaceHolder = ({ ref }: { ref: Ref<HTMLDivElement> }) => (
    <div ref={ref} className="space-y-4 pt-4">
        {
            [1, 2].map((i) => (
                <div key={i} className="animate-pulse flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                    </div>
                </div>
            ))
        }
    </div>
)

export default function CommentViewer({ postId, scrollAreaRef }: CommentViewerProps) {
    const { state, loadMore } = useFetchComments(postId, null, scrollAreaRef);
    const observerTarget = useLoadMore(loadMore, state);

    const getLoadMoreComponent = useCallback(() => {
        if (state.status === 'loading')
            return <ObserverPlaceHolder ref={observerTarget} />;
        if (state.status === 'success') {
            if (state.hasMore)
                return <ObserverPlaceHolder ref={observerTarget} />;
            return <p className="text-xs text-gray-400">沒有更多留言了</p>;
        }
        return null;
    }, [state.status, state.hasMore, observerTarget]);

    return (
        <div className="space-y-4">
            {/* Comments */}
            {
                state.comments && state.comments.map(comment => (
                    <CommentCard key={comment.id} comment={comment} />
                ))
            }
            {/* Error */}
            {
                state.status === 'error' &&
                (
                    state.statusCode == 401 ?
                        <UnAuthorizedResult message="您沒有權限查看這篇文章" />
                        :
                        <ErrorResult title="無法載入留言" error={state.error} refresh={loadMore} />
                )
            }
            {/* The Infinite Scroll Sentinel */}
            {
                getLoadMoreComponent()
            }
        </div>
    );
}


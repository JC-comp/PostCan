import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink"
import useFetchPost from "@/hooks/requests/useFetchPost";
import { ImageMatcher } from "@/components/content/matcher/ImageMatcher";
import { VideoMatcher } from "@/components/content/matcher/VideoMatcher";
import VersionButton from "@/components/content/VersionButton";
import { ErrorResult, UnAuthorizedResult } from "@/components/error";

interface PostContentProps {
    postId: string;
}

export function PostContent({ postId }: PostContentProps) {
    const { post, isLoading, error, errorCode, refresh } = useFetchPost(postId);
    if (isLoading) {
        return (
            <div className="animate-pulse space-y-5">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
            </div>
        );
    }
    if (errorCode === 401)
        return <UnAuthorizedResult message="你沒有權限查看這篇文章" />
    if (error)
        return <ErrorResult title="無法載入文章" error={error} refresh={refresh} />
    if (!post)
        return <ErrorResult title="無法載入文章" error="找不到文章" refresh={refresh} />

    return <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap [&_a]:text-blue-500 [&_a]:transition-colors [&_a:hover]:text-blue-700 [&_a:hover]:underline break-all">
        {/* Link */}
        <h1>
        <a
            href={`https://www.dcard.tw/f/${post.forumAlias}/p/${post.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-colors"
            aria-label={post.title}
        >
            {post.title}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
        </a>
        </h1>
        {/* Version History Button */}
        {
            post.version_count > 1 && <div className="mb-2">
                <VersionButton version_count={post.version_count} />
            </div>
        }
        {/* Post Content */}
        <Interweave
            content={post.content}
            matchers={[new ImageMatcher('img'), new VideoMatcher('video'), new UrlMatcher('url')]}
            newWindow={true}
        />
    </div>
}

export { VersionButton }
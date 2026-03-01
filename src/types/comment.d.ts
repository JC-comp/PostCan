interface Comment {
    id: string;
    floor: number;
    author: Author;
    hidden: boolean;
    content?: string;
    createdAt: string;
    likeCount: number;
    quoteCount: number;
    shareCount: number;
    version_count: number;
    subCommentCount?: number;
}

type FetchCommentState =
    | { status: 'loading'; comments: Comment[]; hasMore: boolean; pageFloor: number }
    | { status: 'success'; comments: Comment[]; hasMore: boolean; pageFloor: number }
    | { status: 'error'; error: string; statusCode: number; comments: Comment[]; hasMore: true; pageFloor: number };
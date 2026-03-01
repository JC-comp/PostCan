interface Author {
    name: string;
    avatar: string;
}

interface PostFormatted {
    title?: string;
    excerpt?: string;
}

interface Post {
    id: string;
    title: string;
    excerpt: string;
    forum: string;
    createdAt: string;
    author: Author;
    nsfw: boolean;
}

interface PostDetail extends Omit<Post, 'id'> {
    id: number;
    content: string;
    forumAlias: string;
    version_count: number;
    topics: string[];
    likeCount: number;
    quoteCount: number;
    shareCount: number;
    collectionCount: number;
    totalCommentCount: number;
}
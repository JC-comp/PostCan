"use client";

export async function getComments(postId: string, lastFloor: number, parentId: string | null): Promise<ServerResponse<Comment[]>> {
  console.log('Querying comments for post ID:', postId);
  console.log('Last floor:', lastFloor);
  console.log('Parent ID:', parentId);
  const count = 2; // Number of comments to return per "page"
  const authors = [
    { name: 'CodeWhisperer', avatar: 'https://i.pravatar.cc/150?u=101' },
    { name: 'DebugMaster', avatar: 'https://i.pravatar.cc/150?u=102' },
    { name: 'PixelPerfect', avatar: 'https://i.pravatar.cc/150?u=103' }
  ];

  const comments = Array.from({ length: count }, (_, i) => {
    const currentFloor = lastFloor + i + 1;
    const isHidden = Math.random() > 0.95;

    // Generate a unique ID using crypto or a combination of post/floor
    const uniqueId = `cmt-${postId}-${currentFloor}-${Math.random().toString(36).substring(2, 7)}`;

    return {
      id: uniqueId,
      floor: currentFloor,
      author: authors[Math.floor(Math.random() * authors.length)],
      hidden: isHidden,
      content: isHidden
        ? undefined
        : `This is a helpful response at floor ${currentFloor}. I think the implementation of ${postId} is quite clever!`,
      createdAt: new Date().toISOString(),
      likeCount: Math.floor(Math.random() * 50),
      quoteCount: Math.floor(Math.random() * 5),
      shareCount: Math.floor(Math.random() * 10),
      version_count: Math.floor(Math.random() * 3) + 1,
      subCommentCount: parentId ? 0 : Math.floor(Math.random() * 8)
    } as Comment;
  });


  try {
    if (Math.random() < 0.3) {
      return {
        status: 'success',
        data: []
      };
    }
    return {
      status: 'success',
      data: comments
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 'error',
      statusCode: 500,
      message: 'The database is currently unavailable.'
    };
  }
}
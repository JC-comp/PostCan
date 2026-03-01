"use client";

export async function getCommentHistory(commentId: string): Promise<ServerResponse<CommentHistory[]>> {
  console.log('Querying comment history for comment ID:', commentId);
  try {
    return {
      status: 'success',
      data: []
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
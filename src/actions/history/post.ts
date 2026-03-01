"use client";

export async function getPostHistory(postId: string): Promise<ServerResponse<PostHistory[]>> {
  console.log('Querying post history for post ID:', postId);
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
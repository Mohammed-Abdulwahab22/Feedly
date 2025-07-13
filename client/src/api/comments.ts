import axios from 'axios';

const API_BASE = "http://localhost:3000/api";

export async function createComment(postId: string, content: string, userId: string) {
  try {
    const response = await axios.post(`${API_BASE}/comments`, {
      content,
      postId,
      userId
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.error || "Failed to create comment");
  }
}
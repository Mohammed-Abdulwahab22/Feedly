import axios from 'axios';
import { getItem } from '../utils/storage';

const API_BASE = "http://localhost:3000/api";

export async function addComment(postId: string, content: string) {
    const token = await getItem('token');

    if (!token) {
        throw new Error("User not authenticated");
    }



    try {
        const response = await axios.post(`${API_BASE}/comments`, {
            content,
            postId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.error || "Failed to create comment");
    }
}
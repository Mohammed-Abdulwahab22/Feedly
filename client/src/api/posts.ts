import axios from 'axios';
import { getItem } from '../utils/storage';
const API_BASE = "http://localhost:3000/api";

export async function getAllPosts() {
  const token = await getItem("token");
  return axios.get(`${API_BASE}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
}

export async function getPostById(id: string) {
  const token = await getItem("token");
  const response = await axios.get(`${API_BASE}/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function upvotePost(id: string) {
  const token = await getItem("token");
  return axios.put(`${API_BASE}/posts/${id}/upvote`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
}

export async function createPost(title: string, description: string, category: string) {
  const token = await getItem("token");
  return axios.post(`${API_BASE}/posts`, {
    title,
    description,
    category
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.data);
}
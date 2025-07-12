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
  const response = await axios.get(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
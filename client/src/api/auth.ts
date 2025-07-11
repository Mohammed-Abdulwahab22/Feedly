// src/api/auth.ts
import axios from 'axios';

const API_BASE = "http://localhost:3000/api";

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export async function LoginUser(identifier: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE}/users/login`, {
      identifier,
      password
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.error || "Login failed"
    };
  }
}


import axios from 'axios';

const API_BASE = "http://localhost:3000/api";


export async function LoginUser(emailOrUsername: string, password: string) {
  try {
    const response = await axios.post(`${API_BASE}/api/users/login`, {
      emailOrUsername,
      password
    });
    return response.data;
  } catch (error) {
    if (error) {
      return  "Login failed" 
    }
    return { success: false, message: "An unexpected error occurred" };
  }
}
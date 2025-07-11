import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import "../styles/Login.css"
import {LoginUser} from '../api/auth';
import { getItem, setItem } from '../utils/storage';

export const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem("token");
    if (token) {
      navigate("/");
    }
    }

    checkToken();
    
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await LoginUser(emailOrUsername, password);
    if (response.token) {
      setItem("token", response.token);
      toast.success("Login successful");
      navigate("/");
    } else {
      toast.error(response.message || "Login failed");
    }
  } catch (err) {
    toast.error("Unexpected error occurred");
  }
};



  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
        <h1>Feedly</h1>
        <h2>Sign In To Your Account</h2>
        <input
          placeholder='Enter your email or username'
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required />
        <input
          type="password"
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button type="submit">Login</button>

        <p>Don't have an account? <a href="/register">Register</a></p>

      </form>

    </div>
  )
}

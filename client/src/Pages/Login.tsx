import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import "../styles/Login.css"
import {LoginUser} from '../api/auth';

export const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // const response = await LoginUser({ email, password });
    // if (response.success) {
    //   localStorage.setItem("token", response.token);
    //   navigate("/");
    // } else {
    //   toast.error(response.message);
    // }
  }


  return (
    <div className='login-page'>
      <form className='login-form' onSubmit={handleLogin}>
        <h1>Feedly</h1>
        <h2>Sign In To Your Account</h2>
        <label>Email Address</label>
        <input
          type="email"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />

        <button type="submit">Login</button>

        <p>Don't have an account? <a href="/register">Register</a></p>

      </form>

    </div>
  )
}

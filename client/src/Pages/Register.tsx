import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/Login.css";
import { getItem } from "../utils/storage";
import { RegisterUser } from "../api/auth";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem("token");
      if (token) {
        navigate("/");
        toast.success("You are already logged in");
      }
    }

    checkToken();

  }, [navigate]);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await RegisterUser(username, email, password);


      toast.success("Account created successfully. Please log in.");
      navigate("/login");

    } catch (err: any) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleRegister}>
        <h1>Feedly</h1>
        <h2>Create Your Account</h2>

        <input
          placeholder="Enter your username"
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          placeholder="Confirm your password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>


        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

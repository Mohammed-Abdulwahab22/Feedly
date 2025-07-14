import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost } from "../api/posts";
import "../styles/AddFeedBack.css";

export const AddFeedbackForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("FEATURE");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await createPost(title, description, category);
      toast.success("Post created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="create-post-page">
      <form className="create-post-form" onSubmit={handleSubmit}>
        <h2>Create New Feedback</h2>

        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="FEATURE">Feature</option>
          <option value="BUG">Bug</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="OTHER">Other</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

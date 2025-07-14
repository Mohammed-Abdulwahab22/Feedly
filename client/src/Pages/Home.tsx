import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../api/posts';
import { FeedbackCard } from '../components/FeedbackCard';
import { Link } from 'react-router-dom';
import "../styles/Home.css";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <div className="home-loading">Loading...</div>;
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Product Feedback Board</h1>
      <Link to="/create" className="create-post-button">+ Add Feedback</Link>

      <div className="feedback-list">
        {posts.map(post => (
          <FeedbackCard
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            category={post.category}
            upvotes={post.upvotes}
            commentsCount={post.comments.length}
            userName={post.user.name}
            createdAt={post.createdAt}
          />
        ))}
      </div>

    </div>
  );
};

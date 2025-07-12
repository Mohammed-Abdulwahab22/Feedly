import React, { useState, useEffect } from 'react'
import { getAllPosts } from '../api/posts';
import { FeedbackCard } from '../components/FeedbackCard';

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
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Posts</h1>

      <ul>
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
      </ul>
    </div>
  )
}

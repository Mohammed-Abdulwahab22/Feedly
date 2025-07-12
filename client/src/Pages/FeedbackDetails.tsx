import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/posts';
import "../styles/FeedbackDetails.css";

export const FeedbackDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id!);
        setPost(response);
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="details-loading">Loading...</div>;
  if (!post) return <div className="details-error">Post not found.</div>;

  return (
    <div className="feedback-details">
      <h2 className="details-title">{post.title}</h2>
      <p className="details-description">{post.description}</p>

      <div className="details-meta">
        <span>Category: {post.category}</span>
        <span>Upvotes: {post.upvotes}</span>
        <span>Author: {post.user.name}</span>
      </div>

      <div className="details-comments">
        <h3>Comments</h3>
        {post.comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          <ul>
            {post.comments.map((comment: any) => (
              <li key={comment.id}>
                <strong>{comment.userId}</strong>: {comment.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

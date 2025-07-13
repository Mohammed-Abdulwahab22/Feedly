import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/posts';
import { addComment } from '../api/comments';
import "../styles/FeedbackDetails.css";

export const FeedbackDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ( !newComment.trim()) return;

    try {
      setSubmitting(true);
      await addComment(id!, newComment);
      setNewComment("");
      await fetchPost(); 
    } catch (error: any) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="details-loading">Loading...</div>;
  if (!post) return <div className="details-error">Post not found.</div>;

  return (
    <div className="feedback-details">
      <div className="feedback-details-card">
        <div className="feedback-header">
          <h2>{post.title}</h2>
          <p className="details-description">{post.description}</p>
          <div className="feedback-tags">
            <span className="badge">{post.category}</span>
            <span className="badge">⬆ {post.upvotes} Upvotes</span>
            <span className="badge">🧑 {post.user.name}</span>
          </div>
        </div>

        <div className="feedback-comments">
          <h3>💬 Comments</h3>
          {post.comments.length === 0 ? (
            <p className="no-comments">No comments yet.</p>
          ) : (
            <ul>
              {post.comments.map((comment: any) => (
                <li key={comment.id}>
                  <div className="comment-card">
                    <strong>User ID: {comment.userId}</strong>
                    <p>{comment.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Posting..." : "Post Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FeedbackDetails;
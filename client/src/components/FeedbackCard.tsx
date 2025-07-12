import React from 'react';
import "../styles/FeedbackCard.css";

type FeedbackCardProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  upvotes: number;
  commentsCount: number;
  userName: string;
  createdAt: string;
};

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  title,
  description,
  category,
  upvotes,
  commentsCount,
  userName,
  createdAt,
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="feedback-card">
      <div className="feedback-card-content">
        <h3 className="feedback-title">{title}</h3>
        <p className="feedback-description">{description}</p>
        <div className="feedback-meta">
          <span className="feedback-category">{category}</span>
          <span className="feedback-author">by {userName}</span>
          <span className="feedback-date">{formattedDate}</span>
        </div>
      </div>

      <div className="feedback-card-actions">
        <div className="feedback-upvotes">⬆ {upvotes}</div>
        <div className="feedback-comments">💬 {commentsCount}</div>
      </div>
    </div>
  );
};

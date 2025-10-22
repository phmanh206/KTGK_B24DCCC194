import React from 'react';
import { useNavigate } from 'react-router-dom';

export type Post = {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  content: string;
  category: string;
  date: string;
};

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="post-card">
      <img src={post.thumbnail} alt={post.title} className="thumbnail" />
      <h3>{post.title}</h3>
      <p>Tác giả: {post.author}</p>
      <p>Ngày đăng: {post.date}</p>
      <p>{post.content.slice(0, 100)}...</p>
      <div className="card-actions">
        <button onClick={() => navigate(`/posts/${post.id}`)}>Đọc thêm</button>
        <button onClick={() => onDelete(post.id)}>Xóa</button>
      </div>
    </div>
  );
};

export default PostCard;

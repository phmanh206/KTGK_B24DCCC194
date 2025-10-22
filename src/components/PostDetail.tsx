import React from 'react';
import type { Post } from './PostCard';

interface PostDetailProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onEdit, onDelete, onBack }) => {
  return (
    <div className="post-detail">
      <img src={post.thumbnail} alt={post.title} className="thumbnail" />
      <h2>{post.title}</h2>
      <p>Tác giả: {post.author}</p>
      <p>Ngày đăng: {post.date}</p>
      <p>Thể loại: {post.category}</p>
      <div className="content">{post.content}</div>
      <div className="detail-actions">
        <button onClick={onBack}>Quay lại</button>
        <button onClick={onEdit}>Chỉnh sửa</button>
        <button onClick={onDelete}>Xóa bài viết</button>
      </div>
    </div>
  );
};

export default PostDetail;

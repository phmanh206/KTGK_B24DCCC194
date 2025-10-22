import React from 'react';
import PostCard from './PostCard';
import type { Post } from './PostCard';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
  onFilter: (keyword: string) => void;
  filter: string;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete, onFilter, filter }) => {
  return (
    <div className="post-list">
      <h2>Danh sách bài viết ({posts.length})</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tiêu đề..."
        value={filter}
        onChange={e => onFilter(e.target.value)}
      />
      <div className="grid">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default PostList;

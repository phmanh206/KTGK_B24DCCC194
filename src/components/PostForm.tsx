import React, { useState } from 'react';
import type { Post } from './PostCard';

interface PostFormProps {
  initial?: Partial<Post>;
  onSubmit: (post: Omit<Post, 'id' | 'date'>) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const categories = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Khác'];

const PostForm: React.FC<PostFormProps> = ({ initial = {}, onSubmit, onCancel, isEdit }) => {
  const [title, setTitle] = useState(initial.title || '');
  const [author, setAuthor] = useState(initial.author || '');
  const [thumbnail, setThumbnail] = useState(initial.thumbnail || '');
  const [content, setContent] = useState(initial.content || '');
  const [category, setCategory] = useState(initial.category || categories[0]);
  const [error, setError] = useState('');

  const validate = () => {
    if (title.length < 10) return 'Tiêu đề phải ít nhất 10 ký tự';
    if (author.length < 3) return 'Tác giả phải ít nhất 3 ký tự';
    if (content.length < 50) return 'Nội dung phải ít nhất 50 ký tự';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError('');
    onSubmit({ title, author, thumbnail, content, category });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới'}</h2>
      {error && <div className="error">{error}</div>}
      <input type="text" placeholder="Tiêu đề" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Tác giả" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="text" placeholder="URL ảnh thumbnail" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
      <textarea rows={10} placeholder="Nội dung bài viết" value={content} onChange={e => setContent(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <div className="form-actions">
        <button type="submit">{isEdit ? 'Cập nhật' : 'Đăng bài'}</button>
        <button type="button" onClick={onCancel}>Hủy</button>
      </div>
    </form>
  );
};

export default PostForm;

import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import type { Post } from './components/PostCard';
import { useState } from 'react';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Công nghệ AI trong đời sống',
    author: 'Nguyễn Văn A',
    thumbnail: 'https://picsum.photos/200?1',
    content: 'AI đang thay đổi cách chúng ta sống và làm việc hàng ngày...'
      + ' Ứng dụng AI trong y tế, giáo dục, giao thông, v.v.',
    category: 'Công nghệ',
    date: '22/10/2025',
  },
  {
    id: 2,
    title: 'Du lịch Đà Lạt mùa thu',
    author: 'Trần Thị B',
    thumbnail: 'https://picsum.photos/200?2',
    content: 'Đà Lạt là điểm đến lý tưởng với khí hậu mát mẻ, cảnh đẹp thơ mộng...'
      + ' Những địa điểm nổi bật, món ăn đặc sản, kinh nghiệm du lịch.',
    category: 'Du lịch',
    date: '21/10/2025',
  },
  {
    id: 3,
    title: 'Ẩm thực miền Trung',
    author: 'Lê Văn C',
    thumbnail: 'https://picsum.photos/200?3',
    content: 'Ẩm thực miền Trung nổi bật với các món ăn đậm đà, hương vị đặc trưng...'
      + ' Bún bò Huế, mì Quảng, bánh xèo, v.v.',
    category: 'Ẩm thực',
    date: '20/10/2025',
  },
  {
    id: 4,
    title: 'Bí quyết sống khỏe mỗi ngày',
    author: 'Phạm Thị D',
    thumbnail: 'https://picsum.photos/200?4',
    content: 'Để sống khỏe, cần duy trì thói quen tập thể dục, ăn uống lành mạnh...'
      + ' Chia sẻ các bí quyết đơn giản giúp nâng cao sức khỏe.',
    category: 'Đời sống',
    date: '19/10/2025',
  },
  {
    id: 5,
    title: 'Khám phá công nghệ mới',
    author: 'Ngô Văn E',
    thumbnail: 'https://picsum.photos/200?5',
    content: 'Công nghệ mới như blockchain, IoT, AR/VR đang phát triển mạnh mẽ...'
      + ' Ứng dụng thực tế và tiềm năng trong tương lai.',
    category: 'Công nghệ',
    date: '18/10/2025',
  },
];

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [filter, setFilter] = useState('');

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa bài viết này?')) {
      setPosts(posts.filter(post => post.id !== id));
      alert('Xóa bài viết thành công!');
    }
  };

  const handleFilter = (keyword: string) => {
    setFilter(keyword);
  };

  const handleCreate = (data: Omit<Post, 'id' | 'date'>, navigate: (url: string) => void) => {
    const newPost: Post = {
      ...data,
      id: posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setPosts([newPost, ...posts]);
    alert('Đăng bài thành công!');
    navigate('/posts');
  };

  const handleUpdate = (id: number, data: Omit<Post, 'id' | 'date'>, navigate: (url: string) => void) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...data } : post));
    alert('Cập nhật thành công!');
    navigate(`/posts/${id}`);
  };

  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList posts={filteredPosts} onDelete={handleDelete} onFilter={handleFilter} filter={filter} />} />
        <Route path="/posts" element={<PostList posts={filteredPosts} onDelete={handleDelete} onFilter={handleFilter} filter={filter} />} />
        <Route path="/create" element={<CreatePostWrapper onCreate={handleCreate} />} />
        <Route path="/posts/:id" element={<PostDetailWrapper posts={posts} onDelete={handleDelete} />} />
        <Route path="/posts/edit/:id" element={<EditPostWrapper posts={posts} onUpdate={handleUpdate} />} />
      </Routes>
    </Router>
  );
}

function CreatePostWrapper({ onCreate }: { onCreate: (data: Omit<Post, 'id' | 'date'>, navigate: (url: string) => void) => void }) {
  const navigate = useNavigate();
  return <PostForm onSubmit={data => onCreate(data, navigate)} onCancel={() => navigate('/posts')} />;
}

function PostDetailWrapper({ posts, onDelete }: { posts: Post[]; onDelete: (id: number) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));
  if (!post) return <div>Không tìm thấy bài viết</div>;
  return (
    <PostDetail
      post={post}
      onEdit={() => navigate(`/posts/edit/${post.id}`)}
      onDelete={() => { onDelete(post.id); navigate('/posts'); }}
      onBack={() => navigate('/posts')}
    />
  );
}

function EditPostWrapper({ posts, onUpdate }: { posts: Post[]; onUpdate: (id: number, data: Omit<Post, 'id' | 'date'>, navigate: (url: string) => void) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === Number(id));
  if (!post) return <div>Không tìm thấy bài viết</div>;
  return (
    <PostForm
      initial={post}
      isEdit
      onSubmit={data => onUpdate(post.id, data, navigate)}
      onCancel={() => navigate(`/posts/${post.id}`)}
    />
  );
}

export default App;

import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Blog Management</div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Trang chủ</NavLink>
        </li>
        <li>
          <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>Viết bài</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return <aside className="sidebar">
    <Link to="/" className="brand">Task<span>Flow</span></Link>
    <nav>
      <NavLink to="/"><LayoutDashboard size={18}/> Dashboard</NavLink>
      <NavLink to="/projects"><FolderKanban size={18}/> Projects</NavLink>
      <NavLink to="/tasks"><CheckSquare size={18}/> Tasks</NavLink>
    </nav>
    <div className="profile"><b>{user?.name}</b><small>{user?.role}</small><button onClick={logout}><LogOut size={16}/> Logout</button></div>
  </aside>;
}

import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { useAuth } from './context/AuthContext';

function Shell({ children }) { return <div className="app"><Navbar/><main>{children}</main></div>; }
export default function App() {
  const { user } = useAuth();
  return <Routes>
    <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
    <Route path="/signup" element={user ? <Navigate to="/"/> : <Signup/>}/>
    <Route path="/" element={<ProtectedRoute><Shell><Dashboard/></Shell></ProtectedRoute>}/>
    <Route path="/projects" element={<ProtectedRoute><Shell><Projects/></Shell></ProtectedRoute>}/>
    <Route path="/tasks" element={<ProtectedRoute><Shell><Tasks/></Shell></ProtectedRoute>}/>
  </Routes>;
}

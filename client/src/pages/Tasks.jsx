import { useEffect, useState } from 'react';
import api from '../api/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';
export default function Tasks() {
  const { user } = useAuth(); const [tasks, setTasks] = useState([]); const [projects, setProjects] = useState([]); const [users, setUsers] = useState([]); const [filter, setFilter] = useState('');
  const load = async () => { const [t,p,u] = await Promise.all([api.get('/tasks'), api.get('/projects'), api.get('/users')]); setTasks(t.data); setProjects(p.data); setUsers(u.data); };
  useEffect(() => { load(); }, []);
  const create = async payload => { await api.post('/tasks', payload); load(); };
  const status = async (id, newStatus) => { await api.put(`/tasks/${id}`, { status: newStatus }); load(); };
  const del = async id => { if (confirm('Delete this task?')) { await api.delete(`/tasks/${id}`); load(); } };
  const visible = filter ? tasks.filter(t => t.status === filter) : tasks;
  return <div><div className="page-head"><h1>Tasks</h1><p>Create, assign and track status of team tasks.</p></div>{user?.role === 'Admin' && <TaskForm projects={projects} users={users} onSubmit={create}/>}<div className="filters"><button onClick={()=>setFilter('')}>All</button><button onClick={()=>setFilter('Todo')}>Todo</button><button onClick={()=>setFilter('In Progress')}>In Progress</button><button onClick={()=>setFilter('Completed')}>Completed</button></div><TaskList tasks={visible} onStatus={status} onDelete={del} user={user}/></div>;
}

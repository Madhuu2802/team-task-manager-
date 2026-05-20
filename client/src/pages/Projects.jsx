import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
export default function Projects() {
  const { user } = useAuth(); const [projects, setProjects] = useState([]); const [users, setUsers] = useState([]); const [form, setForm] = useState({ name: '', description: '', members: [] });
  const load = async () => { const [p,u] = await Promise.all([api.get('/projects'), api.get('/users')]); setProjects(p.data); setUsers(u.data); };
  useEffect(() => { load(); }, []);
  const submit = async e => { e.preventDefault(); await api.post('/projects', form); setForm({ name: '', description: '', members: [] }); load(); };
  const remove = async id => { if (confirm('Delete this project and its tasks?')) { await api.delete(`/projects/${id}`); load(); } };
  const toggleMember = id => setForm(f => ({ ...f, members: f.members.includes(id) ? f.members.filter(x => x !== id) : [...f.members, id] }));
  return <div><div className="page-head"><h1>Projects</h1><p>Create projects and add team members.</p></div><form className="card form-grid" onSubmit={submit}><h3>Create Project</h3><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Project name" required/><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description"/><div className="chips">{users.map(u => <label key={u._id} className="chip"><input type="checkbox" checked={form.members.includes(u._id)} onChange={()=>toggleMember(u._id)}/>{u.name}</label>)}</div><button className="primary">Create Project</button></form><div className="grid">{projects.map(p => <div className="card project-card" key={p._id}><h3>{p.name}</h3><p>{p.description}</p><small>Owner: {p.owner?.name}</small><div className="members">{p.members?.map(m => <span key={m._id}>{m.name}</span>)}</div>{(user?.role === 'Admin' || p.owner?._id === user?.id) && <button className="danger" onClick={()=>remove(p._id)}>Delete</button>}</div>)}</div></div>;
}

import { useState } from 'react';

export default function TaskForm({ projects, users, onSubmit }) {
  const [form, setForm] = useState({ title: '', description: '', project: '', assignedTo: '', priority: 'Medium', status: 'Todo', dueDate: '' });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); onSubmit(form); setForm({ title: '', description: '', project: '', assignedTo: '', priority: 'Medium', status: 'Todo', dueDate: '' }); };
  return <form className="card form-grid" onSubmit={submit}>
    <h3>Create Task</h3>
    <input name="title" value={form.title} onChange={change} placeholder="Task title" required />
    <select name="project" value={form.project} onChange={change} required><option value="">Select Project</option>{projects.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}</select>
    <select name="assignedTo" value={form.assignedTo} onChange={change} required><option value="">Assign To</option>{users.map(u => <option key={u._id} value={u._id}>{u.name} ({u.role})</option>)}</select>
    <input type="date" name="dueDate" value={form.dueDate} onChange={change} required />
    <select name="priority" value={form.priority} onChange={change}><option>Low</option><option>Medium</option><option>High</option></select>
    <select name="status" value={form.status} onChange={change}><option>Todo</option><option>In Progress</option><option>Completed</option></select>
    <textarea name="description" value={form.description} onChange={change} placeholder="Description" />
    <button className="primary">Add Task</button>
  </form>;
}

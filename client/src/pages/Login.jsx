import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth(); const nav = useNavigate(); const [err, setErr] = useState('');
  const [form, setForm] = useState({ email: 'admin@example.com', password: '123456' });
  const submit = async e => { e.preventDefault(); setErr(''); try { await login(form.email, form.password); nav('/'); } catch (x) { setErr(x.response?.data?.message || 'Login failed'); } };
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><h1>Welcome back</h1><p>Login to manage projects, teams and tasks.</p>{err && <div className="error">{err}</div>}<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email"/><input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Password"/><button className="primary">Login</button><small>New user? <Link to="/signup">Create account</Link></small><div className="demo">Demo: admin@example.com / 123456</div></form></div>;
}

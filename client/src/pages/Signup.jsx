import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Signup() {
  const { signup } = useAuth(); const nav = useNavigate(); const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Member' });
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); setErr(''); try { await signup(form); nav('/'); } catch (x) { setErr(x.response?.data?.message || 'Signup failed'); } };
  return <div className="auth-page"><form className="auth-card" onSubmit={submit}><h1>Create account</h1><p>Admin can manage all projects. Member can track assigned work.</p>{err && <div className="error">{err}</div>}<input name="name" onChange={change} placeholder="Full name" required/><input name="email" type="email" onChange={change} placeholder="Email" required/><input name="password" type="password" minLength="6" onChange={change} placeholder="Password" required/><select name="role" value={form.role} onChange={change}><option>Member</option><option>Admin</option></select><button className="primary">Signup</button><small>Already registered? <Link to="/login">Login</Link></small></form></div>;
}

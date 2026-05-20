import { useEffect, useState } from 'react';
import api from '../api/api';
import StatCard from '../components/StatCard';
export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard').then(r => setData(r.data)); }, []);
  return <div><div className="page-head"><h1>Dashboard</h1><p>Track team progress, overdue work and your assigned tasks.</p></div><div className="stats"><StatCard label="Projects" value={data?.projectsCount}/><StatCard label="Total Tasks" value={data?.totalTasks}/><StatCard label="Todo" value={data?.todo}/><StatCard label="In Progress" value={data?.progress}/><StatCard label="Completed" value={data?.completed}/><StatCard label="Overdue" value={data?.overdue} tone="danger"/></div><div className="card"><h3>My Upcoming Tasks</h3>{data?.myTasks?.map(t => <div className="task-row" key={t._id}><div><b>{t.title}</b><small>{t.project?.name}</small></div><span className={`badge ${t.status.replaceAll(' ','-')}`}>{t.status}</span><span>{new Date(t.dueDate).toLocaleDateString()}</span></div>)}{data?.myTasks?.length === 0 && <p className="muted">No assigned tasks.</p>}</div></div>;
}

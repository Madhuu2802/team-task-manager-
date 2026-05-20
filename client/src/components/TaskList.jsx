export default function TaskList({ tasks, onStatus, onDelete, user }) {
  return <div className="card"><h3>Tasks</h3><div className="table-wrap"><table><thead><tr><th>Task</th><th>Project</th><th>Assignee</th><th>Status</th><th>Priority</th><th>Due</th><th>Action</th></tr></thead><tbody>
    {tasks.map(t => <tr key={t._id} className={new Date(t.dueDate) < new Date() && t.status !== 'Completed' ? 'overdue-row' : ''}>
      <td><b>{t.title}</b><small>{t.description}</small></td><td>{t.project?.name}</td><td>{t.assignedTo?.name}</td><td><span className={`badge ${t.status.replaceAll(' ','-')}`}>{t.status}</span></td><td>{t.priority}</td><td>{new Date(t.dueDate).toLocaleDateString()}</td>
      <td className="actions"><select value={t.status} onChange={e => onStatus(t._id, e.target.value)}><option>Todo</option><option>In Progress</option><option>Completed</option></select>{user?.role === 'Admin' && <button className="danger" onClick={() => onDelete(t._id)}>Delete</button>}</td>
    </tr>)}
  </tbody></table>{tasks.length === 0 && <p className="muted">No tasks found.</p>}</div></div>;
}

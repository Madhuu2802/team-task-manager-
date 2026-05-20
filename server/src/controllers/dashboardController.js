import Project from '../models/Project.js';
import Task from '../models/Task.js';

export const dashboard = async (req, res) => {
  let projectIds = null;
  if (req.user.role !== 'Admin') {
    const projects = await Project.find({ $or: [{ owner: req.user._id }, { members: req.user._id }] }).select('_id');
    projectIds = projects.map(p => p._id);
  }
  const base = projectIds ? { project: { $in: projectIds } } : {};
  const now = new Date();
  const [projectsCount, totalTasks, todo, progress, completed, overdue, myTasks] = await Promise.all([
    projectIds ? Promise.resolve(projectIds.length) : Project.countDocuments(),
    Task.countDocuments(base),
    Task.countDocuments({ ...base, status: 'Todo' }),
    Task.countDocuments({ ...base, status: 'In Progress' }),
    Task.countDocuments({ ...base, status: 'Completed' }),
    Task.countDocuments({ ...base, status: { $ne: 'Completed' }, dueDate: { $lt: now } }),
    Task.find({ ...base, assignedTo: req.user._id }).populate('project assignedTo', 'name email').sort({ dueDate: 1 }).limit(8)
  ]);
  res.json({ projectsCount, totalTasks, todo, progress, completed, overdue, myTasks });
};

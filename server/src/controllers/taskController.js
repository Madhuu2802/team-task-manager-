import Project from '../models/Project.js';
import Task from '../models/Task.js';

const projectAccess = (project, user) => user.role === 'Admin' || String(project.owner) === String(user._id) || project.members.map(String).includes(String(user._id));
const canManage = (project, user) => user.role === 'Admin' || String(project.owner) === String(user._id);

export const createTask = async (req, res) => {
  const { title, description, project, assignedTo, status, priority, dueDate } = req.body;
  const projectDoc = await Project.findById(project);
  if (!projectDoc) return res.status(404).json({ message: 'Project not found' });
  if (!canManage(projectDoc, req.user)) return res.status(403).json({ message: 'Only admin or project owner can create tasks' });
  const allowed = projectDoc.members.map(String).includes(String(assignedTo)) || String(projectDoc.owner) === String(assignedTo);
  if (!allowed) return res.status(400).json({ message: 'Assigned user must be part of the project team' });
  const task = await Task.create({ title, description, project, assignedTo, createdBy: req.user._id, status, priority, dueDate });
  res.status(201).json(await task.populate('project assignedTo createdBy', 'name email role'));
};

export const getTasks = async (req, res) => {
  const { project, status, assignedTo } = req.query;
  const filter = {};
  if (project) filter.project = project;
  if (status) filter.status = status;
  if (assignedTo) filter.assignedTo = assignedTo;
  if (req.user.role !== 'Admin') {
    const projects = await Project.find({ $or: [{ owner: req.user._id }, { members: req.user._id }] }).select('_id');
    filter.project = project ? project : { $in: projects.map(p => p._id) };
  }
  const tasks = await Task.find(filter).populate('project assignedTo createdBy', 'name email role').sort({ dueDate: 1 });
  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const project = await Project.findById(task.project);
  if (!project || !projectAccess(project, req.user)) return res.status(403).json({ message: 'Access denied' });
  const isAssignee = String(task.assignedTo) === String(req.user._id);
  if (!canManage(project, req.user) && !isAssignee) return res.status(403).json({ message: 'Only assignee, admin, or owner can update task' });
  if (req.body.status) task.status = req.body.status;
  if (canManage(project, req.user)) {
    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;
    task.priority = req.body.priority ?? task.priority;
    task.dueDate = req.body.dueDate ?? task.dueDate;
    if (req.body.assignedTo) task.assignedTo = req.body.assignedTo;
  }
  await task.save();
  res.json(await task.populate('project assignedTo createdBy', 'name email role'));
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  const project = await Project.findById(task.project);
  if (!project || !canManage(project, req.user)) return res.status(403).json({ message: 'Only admin or owner can delete task' });
  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};

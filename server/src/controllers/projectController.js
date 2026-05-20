import Project from '../models/Project.js';
import Task from '../models/Task.js';

const canAccess = (project, user) => user.role === 'Admin' || String(project.owner) === String(user._id) || project.members.some(m => String(m._id || m) === String(user._id));

export const createProject = async (req, res) => {
  const { name, description, members = [] } = req.body;
  const uniqueMembers = [...new Set([...members, String(req.user._id)])];
  const project = await Project.create({ name, description, owner: req.user._id, members: uniqueMembers });
  const populated = await project.populate('owner members', 'name email role');
  res.status(201).json(populated);
};

export const getProjects = async (req, res) => {
  const query = req.user.role === 'Admin' ? {} : { $or: [{ owner: req.user._id }, { members: req.user._id }] };
  const projects = await Project.find(query).populate('owner members', 'name email role').sort({ createdAt: -1 });
  res.json(projects);
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id).populate('owner members', 'name email role');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (!canAccess(project, req.user)) return res.status(403).json({ message: 'Access denied' });
  res.json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (req.user.role !== 'Admin' && String(project.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Only admin or owner can update project' });
  project.name = req.body.name ?? project.name;
  project.description = req.body.description ?? project.description;
  if (Array.isArray(req.body.members)) project.members = [...new Set([...req.body.members, String(project.owner)])];
  await project.save();
  res.json(await project.populate('owner members', 'name email role'));
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  if (req.user.role !== 'Admin' && String(project.owner) !== String(req.user._id)) return res.status(403).json({ message: 'Only admin or owner can delete project' });
  await Task.deleteMany({ project: project._id });
  await project.deleteOne();
  res.json({ message: 'Project and related tasks deleted' });
};

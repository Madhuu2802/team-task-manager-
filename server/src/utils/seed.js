import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';

dotenv.config();
await connectDB();
await Promise.all([User.deleteMany(), Project.deleteMany(), Task.deleteMany()]);
const admin = await User.create({ name: 'Sneha Admin', email: 'admin@example.com', password: '123456', role: 'Admin' });
const member = await User.create({ name: 'Rahul Member', email: 'member@example.com', password: '123456', role: 'Member' });
const member2 = await User.create({ name: 'Priya Member', email: 'priya@example.com', password: '123456', role: 'Member' });
const project = await Project.create({ name: 'Placement Task Manager', description: 'A demo project for team task management.', owner: admin._id, members: [admin._id, member._id, member2._id] });
const day = 24 * 60 * 60 * 1000;
await Task.create([
  { title: 'Design dashboard UI', description: 'Create cards and task list layout.', project: project._id, assignedTo: member._id, createdBy: admin._id, status: 'In Progress', priority: 'High', dueDate: new Date(Date.now() + day * 2) },
  { title: 'Create project APIs', description: 'Build project CRUD with access control.', project: project._id, assignedTo: admin._id, createdBy: admin._id, status: 'Completed', priority: 'High', dueDate: new Date(Date.now() - day) },
  { title: 'Test overdue tasks', description: 'Verify dashboard overdue count.', project: project._id, assignedTo: member2._id, createdBy: admin._id, status: 'Todo', priority: 'Medium', dueDate: new Date(Date.now() - day * 2) }
]);
console.log('Seed completed');
console.log('Admin: admin@example.com / 123456');
console.log('Member: member@example.com / 123456');
process.exit(0);

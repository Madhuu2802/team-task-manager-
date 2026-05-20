import User from '../models/User.js';
import { createToken } from '../utils/token.js';

const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, role: user.role });

export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already registered' });
  const user = await User.create({ name, email, password, role: role === 'Admin' ? 'Admin' : 'Member' });
  res.status(201).json({ user: safeUser(user), token: createToken(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ user: safeUser(user), token: createToken(user) });
};

export const me = async (req, res) => res.json({ user: safeUser(req.user) });

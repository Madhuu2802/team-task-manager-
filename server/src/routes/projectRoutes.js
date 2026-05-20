import express from 'express';
import { body } from 'express-validator';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
const router = express.Router();
router.route('/').get(protect, getProjects).post(protect, [body('name').isLength({ min: 3 })], validate, createProject);
router.route('/:id').get(protect, getProject).put(protect, updateProject).delete(protect, deleteProject);
export default router;

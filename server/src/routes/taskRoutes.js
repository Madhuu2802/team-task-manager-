import express from 'express';
import { body } from 'express-validator';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
const router = express.Router();
router.route('/').get(protect, getTasks).post(protect, [body('title').isLength({ min: 3 }), body('project').notEmpty(), body('assignedTo').notEmpty(), body('dueDate').isISO8601()], validate, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);
export default router;

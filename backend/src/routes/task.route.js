import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, createTask);
router.get('/', verifyToken, getTasks);
router.patch('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

export default router;

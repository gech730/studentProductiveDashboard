import { Router } from 'express';
import {createTask,getTask,updateTask,deleteTask} from '../controllers/task.controller.js';
import {verifyToken} from '../middleware/auth.js'
const router=Router();

router.post('/add',verifyToken,createTask)
router.get('/all',verifyToken,getTask)
router.patch('/update/:id',verifyToken,updateTask)
router.delete('/delete/:id',verifyToken,deleteTask)
export default router;
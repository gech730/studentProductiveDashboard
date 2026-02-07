import { Router } from 'express';
import {createTask,getTask,updateTask,deleteTask} from '../controllers/task.controller.js'
const router=Router();

router.post('/add',createTask)
router.get('/all',getTask)
router.patch('/update/:id',updateTask)
router.delete('/delete/:id',deleteTask)
export default router;
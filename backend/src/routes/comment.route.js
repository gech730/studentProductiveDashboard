import { Router } from 'express';
import { createComment, getComments } from '../controllers/comment.controller.js';

const router = Router();

router.post('/', createComment);
router.get('/', getComments);

export default router;

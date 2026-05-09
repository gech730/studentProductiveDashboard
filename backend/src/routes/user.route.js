import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, getProfile);
router.patch('/profile', verifyToken, updateProfile);

export default router;

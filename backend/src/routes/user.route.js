import { Router } from 'express';
import { register ,login} from '../controllers/user.controller.js';
import {verifyToken} from '../middleware/auth.js'
const router=Router();
router.post('/register',register);
router.post('/login',login);
router.get("/dashboard", verifyToken, (req, res) => {
   res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});
export default router;
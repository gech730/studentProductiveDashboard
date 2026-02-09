import { Router } from 'express';
import { register ,login,verifyToken} from '../controllers/user.controller.js';
const router=Router();
router.post('/register',register);
router.post('/login',login);
router.get("/dashboard", verifyToken, (req, res) => {
  res.send("Protected data");
});
export default router;
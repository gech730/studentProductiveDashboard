import {Router} from "express";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", verifyToken, (req, res) => {
  res.send("Protected dashboard data");
});

export default router;

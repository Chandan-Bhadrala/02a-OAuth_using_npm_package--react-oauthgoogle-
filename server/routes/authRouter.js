import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller.js";

const router = Router();

router.get("/google", googleLogin);

export default router;

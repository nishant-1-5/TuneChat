import { Router } from "express";
import { authCallback } from "../controller/auth.controller.js";

const router = Router();
//if user has already signed up login else signup
router.post("/callback", authCallback);

export default router;
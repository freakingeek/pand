import express from "express";
import * as authController from "@/controllers/authController";

const router = express.Router();

router.post("/register", authController.register);
router.get("/verify/:token", authController.verify);

router.post("/login", authController.login);
router.post("/logout", authController.logout);


export default router;

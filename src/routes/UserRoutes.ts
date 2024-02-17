import express from "express";
import authMiddleware from "@/middleware/authMiddleware";
import * as userController from "@/controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.get("/me", authMiddleware, userController.getUserById);
router.patch("/me", authMiddleware, userController.updateUserById);
router.delete("/me", authMiddleware, userController.deleteUserById);

export default router;

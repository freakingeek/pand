import express from "express";
import * as userController from "@/controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createNewUser);
// router.post('/', userController.createUser);
// router.delete('/', userController.createUser);
// router.get('/:id', userController.getUserById);

router.get('/verify/:token', userController.verifyNewUser);

export default router;

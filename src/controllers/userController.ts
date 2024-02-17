import { ZodError } from "zod";
import { ClientError } from "@/utils/error";
import * as response from "@/utils/response";
import type { Request, Response } from "express";
import * as userService from "@/services/userService";
import { UpdateUserSchema } from "@/schemas/userSchema";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(response.success(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.userId!);
    res.json(response.success(user));
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserById(req: Request, res: Response) {
  try {
    const validatedData = await UpdateUserSchema.parseAsync(req.body);
    const updatedUser = await userService.updateUserProfile({ _id: req.userId, ...validatedData });
    res.json(response.success(updatedUser));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: "یه جای کار می‌لنگه ...", errors: error.errors });
    }

    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const updatedUser = await userService.deleteUserById(req.userId!);
    res.json(response.success(updatedUser));
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

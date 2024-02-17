import { ZodError } from "zod";
import { ClientError } from "@/utils/error";
import * as response from "@/utils/response";
import type { Request, Response } from "express";
import * as userService from "@/services/userService";
import { CreateUserSchema } from "@/schemas/userSchema";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(response.success(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getCurrentUser(req: Request, res: Response) {}

export async function updateUserProfile(req: Request, res: Response) {
  try {
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

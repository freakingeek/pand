import { ZodError } from "zod";
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

export async function createNewUser(req: Request, res: Response) {
  try {
    const validatedData = CreateUserSchema.parse(req.body);
    const user = await userService.createNewUser(validatedData);

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: "یه جای کار می‌لنگه ...", errors: error.errors });
    }

    console.error("Error creating new user:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

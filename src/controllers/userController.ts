import * as response from "@/utils/response";
import type { Request, Response } from "express";
import * as userService from "@/services/userService";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(response.success(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

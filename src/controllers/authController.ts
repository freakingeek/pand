import { ZodError } from "zod";
import { ClientError } from "@/utils/error";
import * as response from "@/utils/response";
import type { Request, Response } from "express";
import * as authService from "@/services/authService";
import { CreateUserSchema } from "@/schemas/userSchema";

export async function register(req: Request, res: Response) {
  try {
    const validatedData = CreateUserSchema.parse(req.body);
    await authService.register(validatedData);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: "یه جای کار می‌لنگه ...", errors: error.errors });
    }

    console.error("Error creating new user:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

export async function verify(req: Request, res: Response) {
  try {
    const userWithToken = await authService.verify(req.params.token);
    res.json(response.success(userWithToken));
  } catch (error) {
    if (error instanceof ClientError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error("Error creating new user:", error);
    res.status(500).json({ error: "این بار واقعا از بک‌انده!" });
  }
}

export async function login(req: Request, res: Response) {}

export async function logout(req: Request, res: Response) {}

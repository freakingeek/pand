import jwt from "jsonwebtoken";
import * as response from "@/utils/response";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(response.fail("برای دسترسی به این بخش لازمه که وارد بشی"));
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).userId = (decode as any).userId;

    next();
  } catch (error) {
    console.error("Error on auth middleware:", error);
    return res.status(401).json(response.fail("لطفا یه بار از حسابت خارج شو و دوباره امتحان کن"));
  }
}

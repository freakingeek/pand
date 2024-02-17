import cors from "cors";
import express from "express";
import { connectDB } from "@/database";

import authRoutes from "@/routes/auth";
import userRoutes from "@/routes/UserRoutes";

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api_v1.0/auth", authRoutes);
app.use("/api_v1.0/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`[${process.env.PORT}] Server is running ... 🚀`);
});

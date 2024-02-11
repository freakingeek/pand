import cors from "cors";
import express from "express";
import { connectDB } from "@/database";

const app = express();

connectDB();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.listen(process.env.PORT, () => {
  console.log(`[${process.env.PORT}] Server is running ... 🚀`);
});

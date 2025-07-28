import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Optional: if you're sending cookies or credentials
  })
);

import productRoutes from "./routes/productRoutes.js";

app.use(express.json());
app.use("/api", productRoutes);

export default app;

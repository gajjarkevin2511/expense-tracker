import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookies from "cookie-parser";
import expenseRoutes from "./routes/expense.routes.js";
import categoryRoutes from "./routes/category.route.js";
import userRoutes from "./routes/user.route.js";
dotenv.config();
// Routes
const app = express();

app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookies());

// All routes
app.use("/expense", expenseRoutes);
app.use("/category",categoryRoutes);
app.use("/user",userRoutes);

export default app;

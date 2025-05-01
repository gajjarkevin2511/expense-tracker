import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateUserPayload } from "../middlewares/validateUserPayload.js";

const router = express.Router();

// Get all users
router.get("/", getUsers);

// Add a user (with validation)
router.post("/", validateUserPayload, addUser);

// Update a user (with validation)
router.put("/:id", validateUserPayload, updateUser);

// Delete a user
router.delete("/:id", deleteUser);

export default router;
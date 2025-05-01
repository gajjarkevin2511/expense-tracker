import {
  getUsers as getUsersService,
  addUser as addUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../service/user.service.js";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    return successResponse(res, users, "Users fetched successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};

export const addUser = async (req, res) => {
  try {
    const newUser = await addUserService(req.body);
    return successResponse(res, newUser, "User added successfully", 201);
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);
    return successResponse(res, updatedUser, "User updated successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    return successResponse(res, null, "User deleted successfully");
  } catch (error) {
    return errorResponse(res, error, error.statusCode || 500);
  }
};
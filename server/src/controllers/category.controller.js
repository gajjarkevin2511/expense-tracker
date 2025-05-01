import {
  getCategories as getCategoriesService,
  addCategory as addCategoryService,
  updateCategory as updateCategoryService,
  deleteCategory as deleteCategoryService,
} from "../service/category.service.js";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    console.log(categories,"categories")
    return successResponse(res, categories, "Categories fetched successfully");
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const addCategory = async (req, res) => {
  try {
    const newCategory = await addCategoryService(req.body);
    return successResponse(
      res,
      newCategory,
      "Category added successfully",
      201
    );
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory = await updateCategoryService(id, req.body);
    return successResponse(
      res,
      updatedCategory,
      "Category updated successfully"
    );
  } catch (error) {
    return errorResponse(res, error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCategoryService(id);
    return successResponse(res, null, "Category deleted successfully");
  } catch (error) {
    return errorResponse(res, error);
  }
};

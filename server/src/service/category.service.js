import Category from "../models/category.modal.js";
import { BadRequest, NotFound } from "../utils/error.utils.js";

export const getCategories = async () => {
  return await Category.findAll();
};

export const addCategory = async (categoryData) => {
  const category = await Category.findOne({
    where: { name: categoryData.name },
  });

  if (category) {
    throw new BadRequest(
      "Category already exists, please choose another category"
    );
  }

  const newCategory = await Category.create(categoryData);

  return newCategory.dataValues;
};

export const updateCategory = async (id, categoryData) => {
  const category = await Category.findByPk(id);

  if (!category) {
    throw new NotFound("Category not found");
  }

  const existingCategory = await Category.findOne({
    where: {
      name: categoryData.name,
    },
  });

  if (existingCategory) {
    throw new BadRequest(
      "Category already exists, please choose another category"
    );
  }

  await Category.update(categoryData, { where: { id } });

  const updatedCategory = await Category.findByPk(id);

  return updatedCategory.dataValues;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new NotFound("Category not found");
  }
  return await Category.destroy({ where: { id } });
};

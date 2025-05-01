import User from "../models/user.modal.js";
import { BadRequest, NotFound } from "../utils/error.utils.js";

export const getUsers = async () => {
  return await User.findAll();
};

export const addUser = async (userData) => {

  const existingUser = await User.findOne({ where: { email: userData.email } });
  
  if (existingUser) {
    throw new BadRequest("User already exist with same email, Please choose enter email");
  }
  const newUser = await User.create(userData);
  return newUser.dataValues;
};


export const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFound("User not found");
  }

  const existingUser = await User.findOne({ where: { email: userData.email } });
  console.log(existingUser, "existingUser");
  console.log(existingUser.dataValues.id,"existingUser.dataValues.id")
  console.log(id,"id")
  if (existingUser && String(existingUser.dataValues.id) !== String(id)) {
    throw new BadRequest("User already exist with same email, Please choose enter email");
  }

  await User.update(userData, { where: { id } });
  const updatedUser = await User.findByPk(id);
  
  return updatedUser?.dataValues;
};

export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFound("User not found");
  }
  return User.destroy({ where: { id } });
};
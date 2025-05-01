import { sequelize, DataTypes } from "../db.connection.js";
import User from "./user.modal.js";
import Category from "./category.modal.js";

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users", 
      key: "id",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  categoryId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "categories", 
      key: "id",
    },
    onUpdate: "cascade",
    onDelete: "cascade",
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "expenses",
  timestamps: true,
});

Expense.belongsTo(User, { foreignKey: "userId", as: "User" });
User.hasMany(Expense, { foreignKey: "userId", as: "Expenses" });  // User has many Expenses

Expense.belongsTo(Category, { foreignKey: "categoryId", as: "Category" });
Category.hasMany(Expense, { foreignKey: "categoryId", as: "Expenses" });  // Category has many Expenses


Expense.sync({ force: false });

export default Expense;

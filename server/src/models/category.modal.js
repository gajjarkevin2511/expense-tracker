import { sequelize, DataTypes } from "../db.connection.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

Category.sync({ force: false });

export default Category;

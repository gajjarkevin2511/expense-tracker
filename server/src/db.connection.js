import { Sequelize, DataTypes } from "sequelize";

import dotenv from "dotenv";
dotenv.config();

const ENV = {
  DB_NAME: process.env.DB_NAME || "expense_traker",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "root1234",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DIALECT: process.env.DB_DIALECT || "mysql",
};

// Initialize Sequelize instance
const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT, // Supported dialects: 'mysql', 'postgres', 'sqlite', etc.
});

// Authenticate the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// This will create the table if it doesn't exist (and recreate it if it does exist)
export { sequelize, DataTypes };

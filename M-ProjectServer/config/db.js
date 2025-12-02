import { Sequelize } from "sequelize";
import { BudgetaryQuotation } from "./bqModel.js"; // ⬅ model file

// 🔹 CHANGE THESE VALUES to match your PostgreSQL credentials
const DB_NAME = "Marketing";
const DB_USER = "postgres";
const DB_PASSWORD = "admin12";  // ⬅ put your real pgAdmin password
const DB_HOST = "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Register model
db.BudgetaryQuotation = BudgetaryQuotation(sequelize, Sequelize);

export default db;

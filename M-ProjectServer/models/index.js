import { Sequelize } from "sequelize";
import { BudgetaryQuotation } from "./bqModel.js";   // ⬅ correct import

const sequelize = new Sequelize(
  "Marketing",
  "postgres",
  "admin12",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Register model
db.BudgetaryQuotation = BudgetaryQuotation(sequelize, Sequelize);

export default db;

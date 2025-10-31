const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequlize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT || 5432,
    logging: console.log,
  }
);

sequlize
  .authenticate()
  .then(() => {
    console.log("Database Connection successfully");
  })
  .catch((err) => {
    console.log("Db Connection errr :", err);
  });

module.exports = sequlize;

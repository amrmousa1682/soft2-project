require("dotenv").config();

const Sequelize = require("sequelize").Sequelize;
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 3306,
  dialect: "mysql",
  retry: {
    max: 10,
    backoffBase: 2000,
    backoffExponent: 1.1,
  },
});

module.exports = sequelize;

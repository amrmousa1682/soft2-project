const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Department = sequelize.define("department", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    ubique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  }
});

module.exports = Department;
const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Subject = sequelize.define("subject", {
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
  },
  classRoom: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Subject;

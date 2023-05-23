const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Enrollment = sequelize.define("enrollment", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    ubique: true,
  },
});

module.exports = Enrollment;

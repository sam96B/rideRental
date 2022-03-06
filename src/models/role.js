const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
  }
});

module.exports = Role;

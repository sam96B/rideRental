const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const UserReport = sequelize.define("user_report", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
  }
});

module.exports = UserReport;

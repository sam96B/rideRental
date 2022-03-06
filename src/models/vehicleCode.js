const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const VehicleCode = sequelize.define("vehicle_code", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  vehicle_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('available', 'rented', 'maintenance'),
    allowNull: false,
  },
  deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
  }
});

module.exports = VehicleCode;

const Sequelize = require("sequelize");
const sequelize = require("../database/config/database");

const VehicleType = sequelize.define("vehicle_type", {
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
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
  }
});

module.exports = VehicleType;

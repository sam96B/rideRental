const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const VehicleCode = sequelize.define("vec_trans", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = VehicleCode;
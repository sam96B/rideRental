const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const Vehicle = sequelize.define("vehicle", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    charge: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    photo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Vehicle;
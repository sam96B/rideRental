const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const Brand = sequelize.define("brand", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Brand;
const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const Transaction = sequelize.define("transaction", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: Sequelize.ENUM('paid', 'pending'),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    }

});

module.exports = Transaction;
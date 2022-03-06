const Sequelize = require("sequelize");

const sequelize = require("../database/config/database");

const User = sequelize.define("user", {
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
  address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  discount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    
  },
  total_payment: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
  }
});

module.exports = User;

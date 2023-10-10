const Sequelize = require("sequelize");

const sequelize = require("../config/database");

const bookingslot = sequelize.define("bookingslot", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  emailId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = bookingslot;

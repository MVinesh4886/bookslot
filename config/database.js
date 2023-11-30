const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "bookingslot",
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: "127.0.0.1",
  }
);

module.exports = sequelize;

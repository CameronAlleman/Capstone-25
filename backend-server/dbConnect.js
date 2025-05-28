const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectMysql = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to DB: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

connectMysql();

module.exports = sequelize; //

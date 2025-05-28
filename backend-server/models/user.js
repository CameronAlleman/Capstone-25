const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConnect"); // directly the Sequelize instance

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "user_name",
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pet: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    camperType: {
      type: DataTypes.INTEGER,
      field: "camper_type",
    },
    camperLength: {
      type: DataTypes.INTEGER,
      field: "camper_length",
    },
    slideouts: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize, // this must be the Sequelize instance
    modelName: "user",
    timestamps: true,
    freezeTableName: true,
  }
);

module.exports = User;

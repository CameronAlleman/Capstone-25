const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConnect"); // directly the Sequelize instance

class Campground extends Model {}

Campground.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    parkMap: {
      type: DataTypes.STRING(255), //stores site map as URL
      allowNull: false,
      field: "park_map",
    },
    description: {
      type: DataTypes.STRING(255),
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: "campground",
    tableName: "campground",
    timestamps: true, // enables createdAt and updatedAt
  }
);

module.exports = Campground;

const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Amenities extends Model {}

Amenities.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pool: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    playground: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    miniatureGolf: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "miniature_golf", // reference snake-case field
    },
    waterAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    fishing: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "amenities",
    tableName: "amenities",
    timestamps: true, // enables createdAt and updatedAt
  }
);

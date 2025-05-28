const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Site extends Model {}

Site.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amperage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sewer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    water: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pullThru: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "pull_thru",
    },
    patio: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "site",
    tableName: "site",
    timestamps: true, // enables createdAt and updatedAt
  }
);

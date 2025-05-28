const { DataTypes, Model } = require("sequelize");
const sequelize = require("../dbConnect");

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    arrivalDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "arrival_date",
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "departure_date",
    },
    campgroundId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "campground_id",
      references: {
        model: "campground",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "reservation",
    tableName: "reservation",
    timestamps: true,
  }
);

module.exports = Reservation;

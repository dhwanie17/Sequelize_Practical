
module.exports = (sequelize, DataTypes) => {
  const v4 = require("uuid");
  const BarberRating = sequelize.define("BarberRating", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    barber_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
    }
  });

  return BarberRating;

}
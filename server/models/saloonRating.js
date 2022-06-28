
module.exports = (sequelize, DataTypes) => {
  const v4 = require("uuid");
  const SaloonRating = sequelize.define("SaloonRating", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    saloon_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    rating: {
      type: DataTypes.DECIMAL,
    }
  });

  return SaloonRating;
}
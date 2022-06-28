
module.exports = (Sequelize, DataTypes) => {
    const v4 = require("uuid");
    const Saloon = Sequelize.define("Saloon", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        owner_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        saloon_name: {
            type: DataTypes.STRING,
        },
        mobile_number: {
            type: DataTypes.INTEGER,
        },
        rating: {
            type: DataTypes.DECIMAL,
        }

    });
    return Saloon;
}
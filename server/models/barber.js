
module.exports = (Sequelize, DataTypes) => {
    const uuidv4 = require("uuid");
    const Barber = Sequelize.define("Barber", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          }, 
          saloon_id:{
            type: DataTypes.UUID,
            allowNull: false
          },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,   
        },
        rating: {
            type: DataTypes.DECIMAL,
        },
    });
 return Barber;
    
}
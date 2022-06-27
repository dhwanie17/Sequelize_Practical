
module.exports = (Sequelize, DataTypes) => {
 
    const User = Sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
          },        
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
            validate: {
                isEmail :true
            }
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,   
        },
        password: {
            type: DataTypes.STRING,
        },
        mobile_number: {
            type: DataTypes.INTEGER,   
        },
    });

 return User;
    
}
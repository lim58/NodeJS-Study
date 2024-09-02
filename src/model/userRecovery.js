const sequelize = require("sequelize")

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("UserRecovery", {
        id: {
            type: DataTypes.INTEGER(),
            primaryKey : true,
            autoIncrement : true
        },
        email: {
          type: DataTypes.STRING(),
          unique: true
        },
    })
}
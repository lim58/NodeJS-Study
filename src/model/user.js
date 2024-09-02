const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER(),
        primaryKey : true,
        autoIncrement : true
    },
    email: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING(),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false,
    }
  }
  );
};

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
      unique: true
    },
    user_name: {
      type: DataTypes.STRING()
    },
    user_id: {
        type: DataTypes.STRING(),
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
    }
  }
  );
};

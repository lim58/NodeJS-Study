const { OP, QueryType } = require("sequelize");
const { user, sequelize } = require("./index");

const saveUser = async (email, user_name, user_id, password) => {
  
  if (!user_id || !password) {
    return "ERROR";
  }

  const result = await user.create({
    email,
    user_name,
    user_id,
    password,
  });

  return result;
};

const findOneUserByUserId = async (user_id) => {
  const thisUser = await user.findOne({ where: { user_id } });
  if(!thisUser) {
    console.log("this user is not defined")
    return undefined;
  }
  return thisUser;
};

module.exports = {
  saveUser,
  findOneUserByUserId,
};

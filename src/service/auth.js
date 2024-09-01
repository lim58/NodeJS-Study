const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const signup = (req, res) => {
  const { user_id, password } = req.body;

  const exists = db.get(user_id);

  if (exists) {
    res.status(400).send("이미 존재하는 아이디입니다");
    return;
  }

  try {
    const newUser = { user_id, password };
    db.set(user_id, password);

    res.redirect("/login");

    return req.status(201).json({
      id,
      password,
    });
    
  } catch (err) {
    console.error("회원가입 오류", err);
  }
};

const login = (req, res) => {};

const logout = (req, res) => {};

const cancelAccount = (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
  cancelAccount,
};

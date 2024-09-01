const { User } = require("../model/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const exists = await db.get(user_id);

    if (exists) {
      return res.status(400).send("이미 존재하는 아이디입니다");
    }

    await db.set(user_id, password);

    return res.status(201).json({
      id: user_id,
      password,
    });
  } catch (err) {
    console.error("회원가입 오류", err);
    return res.status(500).send("회원가입 중 오류 발생");
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

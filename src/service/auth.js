const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const { createToken } = require("../middleware/jwt")

//회원가입
const signup = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const exists = await db.get(user_id);

    if (exists) {
      return res.status(409).send("이미 존재하는 아이디입니다");
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

//로그인
const login = async (req, res) => {
  const { user_id, password } = req.body

  try {
    const user = await db.get(user_id)

    if(!user) {
      return res.status(404).send("사용자를 찾을 수 없습니다")
    }
    if(user.password !== password) {
      return res.status(409).send("잘못된 비밀번호 입니다")
    }
    
    const token = createToken(user_id)
    return res.status(200).json({
      message: "로그인 성공",
      token
    })

  } catch (err) {
    console.error("로그인 오류", err);
    return res.status(500).send("로그인 중 오류 발생");
  }
};

//로그아웃
const logout = async (req, res) => {
  const token = req.headers["authorization"].split('')[1]
  
  if(token) {
    try {
      await redisCli.del(token)
      return res.status(200).send("로그아웃 성공")
    }
    catch(err) {
      console.error("로그아웃 오류", err)
      return res.status(500).send("로그아웃 중 오류 발생")
    }
  }
};

//회원탈퇴
const cancelAccount = (req, res) => {};

module.exports = {
  signup,
  login,
  logout,
  cancelAccount,
};

const jwt = require("jsonwebtoken");
const { createToken, validateAccess } = require("../middleware/jwt");
const { saveUser, findOneUserByUserId } = require("../model/repository");
const { user } = require("../model/index");
const bcrypt = require("bcrypt");
const { redisCli } = require("../config/redis");

//회원가입
const signup = async (req, res) => {
  const { email, user_name, user_id, password } = req.body;

  try {
    const thisUser = await findOneUserByUserId(user_id);
    const existEmail = await user.findOne({ where: { email } });

    if (thisUser) {
      return res.status(409).send("이미 존재하는 아이디입니다");
    }
    if (existEmail) {
      return res.status(409).send("이미 존재하는 이메일 입니다");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = (await saveUser(email, user_name, user_id, hashedPassword))
      .id;

    return res.status(201).json({
      id: userId,
      message: "회원가입 성공!",
    });
  } catch (err) {
    console.error("회원가입 오류", err);
    return res.status(500).send("회원가입 중 오류 발생");
  }
};

//로그인
const login = async (req, res) => {
  const { user_id, password } = req.body;

  try {
    const isUser = await findOneUserByUserId(user_id);
    console.log(isUser);
    if (!isUser) {
      return res.status(404).send("사용자를 찾을 수 없습니다");
    }

    const isPasswordValid = await bcrypt.compare(password, isUser.password);
    if (!isPasswordValid) {
      return res.status(401).send("비밀번호가 일치하지 않습니다");
    }

    const token = createToken(user_id);
    return res.status(200).json({
      message: "로그인 성공",
      token,
    });
  } catch (err) {
    console.error("로그인 오류", err);
    return res.status(500).send("로그인 중 오류 발생");
  }
};

//로그아웃
const logout = async (req, res) => {
  const token = req.headers["authorization"]?.split("")[1];

  if (token) {
    try {
      await redisCli.del(token);
      return res.status(200).send("로그아웃 성공");
    } catch (err) {
      console.error("로그아웃 오류", err);
      return res.status(500).send("로그아웃 중 오류 발생");
    }
  } else {
    res.status(401).send("토큰이 없습니다");
  }
};

//회원탈퇴
const cancelAccount = async (req, res) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  if (!accessToken) {
    return res.status(401).send("authorization 헤더가 없습니다");
  }
  
  const secretKey = process.env.JWT_SECRET_KEY || "secretKey";

  try {
    const decoded = jwt.decode(accessToken, secretKey);

    const userId = decoded.id;

    const isUser = await findOneUserByUserId(userId);

    console.log("decoded", decoded)
    console.log("userId", userId)

    if (!isUser) {
      return res.status(404).send("사용자를 찾을 수 없습니다");
    }

    await isUser.destroy()

    return res.status(200).send("회원탈퇴가 성공적으로 완료되었습니다");
  } catch (err) {
    console.log("회원탈퇴 오류", err);
    return res.status(500).send("회원가입 중 오류 발생");
  }
};

module.exports = {
  signup,
  login,
  logout,
  cancelAccount,
};

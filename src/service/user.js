const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
const { findOneUserByUserId } = require("../model/repository");
const secretKey = process.env.JWT_SECRET_KEY || "secretKey";

//회원정보 수정
const modifyProfile = async (req, res) => {
  const token = req.headers["authorization"]?.split("")[1];

  const { id } = req.payload;

  if (token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      const userId = decoded.id;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).send("사용자를 찾을 수 없습니다");
      }

      user.user_name = newUserName;
      await user.save();

      return res.status(200).send("회원정보 수정이 성공적으로 완료되었습니다");
    } catch (err) {
      console.log("회원정보 수정 오류", err);
      return res
        .status(500)
        .send("회원정보를 수정하는 과정에서 오류가 발생하였습니다");
    }
  } else {
    res.status(401).send("토큰이 없습니다");
  }
};

//사용자 정보 조회
const userInfo = async (req, res) => {
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

    return res.status(200).json({
      email: isUser.email,
      name: isUser.user_name,
    });
  } catch (err) {
    console.log("사용자 정보를 불러오지 못했습니다", err);
    return res
      .status(500)
      .send("사용자 정보를 불러오는 과정에서 오류가 발생하였습니다");
  }
};

module.exports = {
  modifyProfile,
  userInfo,
};

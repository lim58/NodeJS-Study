const jwt = require("jsonwebtoken")
const { User } = require("../model/user")
const secretKey = process.env.JWT_SECRET_KEY || "secretKey"

//회원정보 수정
const modifyProfile = (req, res) => {};

//사용자 정보 조회
const userInfo = async (req, res) => {
  const token = req.headers["authorization"].split("")[1];

  if (token) {
    try {
        const decoded = jwt.verify(token, secretKey)
        const userId = decoded.id

        const user = await User.findByPk(userId)

        if(!user) {
            return res.status(404).send("사용자를 찾을 수 없습니다")
        }

        return res.status(200).json({
            email: user.email,
            user_name: user.user_name,
            user_id: user.user_id,
            password: user.password
        })
    }
    catch(err) {
        console.log("사용자 정보를 불러오지 못했습니다", err)
        return res.status(500).send("사용자 정보를 불러오는 과정에서 오류가 발생하였습니다")
    }
  } else {
    res.status(400).send("토큰이 없습니다");
  }
};

module.exports = {
    modifyProfile,
    userInfo
}
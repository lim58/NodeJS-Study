const { User } = require("../model/user");
const jwt = require("jsonwebtoken");
const validateAccess = require("../middleware/jwt");

const findId = async (req, res) => {
    const token = req.headers["authorization"].split("")[1];
    const { email } = req.body

    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey)
        const userId = decoded.id

        const user = await User.findByPk(userId)
  
        if(!user) {
          return req.status(404).send("사용자를 찾을 수 없습니다")
        }

        if(user.email === email) {
            return req.status(200).json({
                user_id : user.user_id
            })
        }

      }
      catch(err){
        console.log("아이디 찾기 오류", err)
        return res.status(500).send("아이디 찾기 중 오류 발생")
      }
      
    } else {
      res.status(400).send("토큰이 없습니다");
    }
};

const findPassword = async (req, res) => {
    const token = req.headers["authorization"].split("")[1];
    const { email } = req.body

    if (token) {
      try {
        const decoded = jwt.verify(token, secretKey)
        const userId = decoded.id
  
        const user = await User.findByPk(userId)
  
        if(!user) {
          return req.status(404).send("사용자를 찾을 수 없습니다")
        }

        if(user.email === email) {
            return req.status(200).json({
                password : user.password
            })
        }

      }
      catch(err){
        console.log("아이디 찾기 오류", err)
        return res.status(500).send("아이디 찾기 중 오류 발생")
      }
      
    } else {
      res.status(400).send("토큰이 없습니다");
    }
};

module.exports = {
  findId,
  findPassword,
};

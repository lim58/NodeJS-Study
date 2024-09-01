const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';

//JWT 토큰 생성
const createToken = (user_id) => {
  const token = jwt.sign({id : user_id}, secretKey, { expiresIn: "1h" });
  return token;
};

//토큰 재발급
const refreshToken = async (req, res) => {
  const token = await req.get('authorization').split(' ')[1]

  if(!req.payload) {
    return res.status(400).send("토큰을 찾을 수 없습니다")
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const payload = {
      id: decoded.id,
    };

    const newToken = createToken(payload);
    return newToken;

  } catch (err) {
    console.error("ERROR RefreshToken", err);
    return null;
  }
};

//토큰 검증
const validateAccess = (req, res) => {
  const userToken = req.headers["authorization"]?.split("")[1];

  if (!userToken || userToken === "null") {
    console.log("요청은 있지만 토큰이 없습니다");

    res.status(401).json({
      error: "JWT 유효성 검증 실패",
    });

    return;
  }
  try {
    req.payload = jwt.verify(userToken, secretKey)
    next()

  } catch (err) {
    console.error("ERROR ValidateAccess", err);
    return;
  }
};

module.exports = {
  createToken,
  refreshToken,
  validateAccess,
};

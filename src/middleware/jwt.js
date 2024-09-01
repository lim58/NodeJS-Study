const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY || 'secretKey';

const createToken = (user_id) => {
  const token = jwt.sign({id : user_id}, secretKey, { expiresIn: "1h" });
  return token;
};

const refreshToken = (token) => {
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

const validateAccess = () => {
  const userToken = req.headers["authorization"]?.split("")[1];

  if (!userToken || userToken === "null") {
    console.log("요청은 있지만 토큰이 없습니다");

    res.status(401).json({
      error: "JWT 유효성 검증 실패",
    });

    return;
  }
  try {
    const jwtDecoded = jwt.verify(userToken, secretKey)
    
    const id = jwtDecoded.id
    req.currentId = id

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

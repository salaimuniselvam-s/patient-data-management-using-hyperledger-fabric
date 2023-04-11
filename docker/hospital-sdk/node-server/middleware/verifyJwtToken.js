const jwt = require("jsonwebtoken");
const { REFRESH_TOKEN } = require("../tasks/adminTasks");
require("dotenv").config();

const jwtSecretToken = process.env.JWT_SECRET_TOKEN;
const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token === "" || token === "null") {
      return res.status(401).send("Unauthorized request: Token is missing");
    }
    jwt.verify(token, jwtSecretToken, (err, user) => {
      if (
        err ||
        req.headers.username != user.username ||
        req.headers.role != user.role
      ) {
        return res
          .status(403)
          .send("Unauthorized request: Wrong or expired token found");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send("Unauthorized request: Token is missing");
  }
};

/**
 * @description Generates a new accessToken
 */
const generateAccessToken = (username, role) => {
  return jwt.sign({ username: username, role: role }, jwtSecretToken, {
    expiresIn: "24h",
  });
};

const generateTokens = (username, role) => {
  const accessToken = generateAccessToken(username, role);
  const refreshToken = jwt.sign(
    { username: username, role: role },
    refreshSecretToken,
    { expiresIn: "24h" }
  );
  REFRESH_TOKEN.push(refreshToken);
  return { accessToken, refreshToken };
};

module.exports = { generateAccessToken, authenticateJWT, generateTokens };

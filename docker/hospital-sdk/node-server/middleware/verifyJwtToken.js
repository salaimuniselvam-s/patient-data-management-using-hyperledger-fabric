const jwt = require("jsonwebtoken");
const { jwtSecretToken } = require("../utils/utils");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token === "" || token === "null") {
      return res.status(401).send("Unauthorized request: Token is missing");
    }
    jwt.verify(token, jwtSecretToken, (err, user) => {
      if (err) {
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
    expiresIn: "5m",
  });
};

module.exports = { generateAccessToken, authenticateJWT };

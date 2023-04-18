const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateTokens,
} = require("../middleware/verifyJwtToken");
const { UserDetails } = require("../db/schema");
const { comparePassword } = require("../utils/hashPassword");
const { compareRefreshToken, deleteRefreshToken } = require("../utils/utils");
require("dotenv").config();

const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;

/**
 * @description Login and create a session with and add two variables to the session
 */
const Login = async (req, res) => {
  // Read username and password from request body
  let { username, password, role } = req.body;
  let user;
  let hospitalId;
  try {
    const [userDetail] = await UserDetails.find({ username: username });
    user =
      comparePassword(password, userDetail?.password) &&
      userDetail?.username == username &&
      userDetail?.role == role;
    hospitalId = userDetail?.hospitalId;
  } catch (error) {
    console.error(error, "bug");
    return res
      .status(400)
      .send({ error: "Username or password or role is incorrect!" });
  }

  if (user) {
    // Generate an access token
    const { accessToken, refreshToken } = generateTokens(username, role);

    // Once the password is matched a session is created with the username and password
    res.status(200);
    res.json({
      username,
      role,
      accessToken,
      refreshToken,
      hospitalId,
    });
  } else {
    res
      .status(400)
      .send({ error: "Username or password or role is incorrect!" });
  }
};

/**
 * @description Creates a new accessToken when refreshToken is passed in post request
 */
const RefreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!compareRefreshToken(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshSecretToken, (err, user) => {
    if (
      err ||
      req.headers.username != user.username ||
      req.headers.role != user.role
    ) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken(
      req.headers.username,
      req.headers.role
    );

    res.json({
      accessToken,
      username: req.headers.username,
      role: req.headers.role,
    });
  });
};

/**
 * @description Logout to remove REFRESH_TOKEN
 */
const Logout = (req, res) => {
  const authHeader = req.headers.authorization;
  deleteRefreshToken(authHeader.split(" ")[1]);
  res.status(204).send("Successfully Logged out the user");
};

module.exports = { Login, Logout, RefreshToken };

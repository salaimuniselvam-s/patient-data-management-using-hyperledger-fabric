const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../middleware/verifyJwtToken");
let { REFRESH_TOKEN } = require("../tasks/adminTasks");
const UserDetails = require("../db/schema");
require("dotenv").config();

const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;

/**
 * @description Login and create a session with and add two variables to the session
 */
const Login = async (req, res) => {
  // Read username and password from request body
  let { username, password, role } = req.body;
  let user;
  try {
    const [userDetail] = await UserDetails.find({ username: username });
    user =
      userDetail?.password == password &&
      userDetail?.username == username &&
      userDetail?.role == role;
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ error: "Username or password or role is incorrect!" });
  }

  if (user) {
    // Generate an access token
    const accessToken = generateAccessToken(username, role);
    const refreshToken = jwt.sign(
      { username: username, role: role },
      refreshSecretToken,
      { expiresIn: "24h" }
    );
    REFRESH_TOKEN.push(refreshToken);
    // Once the password is matched a session is created with the username and password
    res.status(200);
    res.json({
      accessToken,
      refreshToken,
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

  if (!REFRESH_TOKEN.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshSecretToken, (err, username) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken({
      username: username,
      role: req.headers.role,
    });
    res.json({
      accessToken,
    });
  });
};

/**
 * @description Logout to remove REFRESH_TOKEN
 */
const Logout = (req, res) => {
  REFRESH_TOKEN = REFRESH_TOKEN.filter((token) => token !== req.headers.token);
  res.status(204).send("Successfully Logged out the user");
};

module.exports = { Login, Logout, RefreshToken };

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {
  refreshSecretToken,
  ROLE_PATIENT,
  capitalize,
  CHANGE_TMP_PASSWORD,
  getMessage,
  ROLE_DOCTOR,
  ROLE_ADMIN,
} = require("../utils/utils");
const network = require("../../fabric-network/app");
const { generateAccessToken } = require("../middleware/verifyJwtToken");
let { ADMIN_DETAILS, REFRESH_TOKEN } = require("../tasks/adminTasks");

/**
 * @description Login and create a session with and add two variables to the session
 */
const Login = async (req, res) => {
  // Read username and password from request body
  let { username, password, role } = req.body;
  let user;

  if (role === ROLE_DOCTOR || role === ROLE_ADMIN) {
    const value = ADMIN_DETAILS.filter((data) => data.userName == username);
    // comparing passwords
    user = value[0].password === password;
  }

  if (role === ROLE_PATIENT) {
    const networkObj = await network.connectToNetwork(username);
    const newPassword = req.body.newPassword || password;

    if (networkObj.error) return res.status(400).send(networkObj.error);

    if (newPassword === null || newPassword === "") {
      const value = crypto.createHash("sha256").update(password).digest("hex");
      const response = await network.invoke(
        networkObj,
        true,
        capitalize(role) + "Contract:getPatientPassword",
        username
      );
      if (response.error) {
        res.status(400).send(response.error);
      } else {
        const parsedResponse = await JSON.parse(response);
        if (parsedResponse.password.toString("utf8") === value) {
          !parsedResponse.pwdTemp
            ? (user = true)
            : res.status(200).send(getMessage(false, CHANGE_TMP_PASSWORD));
        }
      }
    } else {
      let args = {
        patientId: username,
        newPassword: newPassword,
      };

      args = [JSON.stringify(args)];
      const response = await network.invoke(
        networkObj,
        false,
        capitalize(role) + "Contract:updatePatientPassword",
        args
      );
      if (response.error) return res.status(500).send(response.error);
      else user = true;
    }
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
    res.status(400).send({ error: "Username or password incorrect!" });
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
  res.sendStatus(204);
};

module.exports = { Login, Logout, RefreshToken };

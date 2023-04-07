const express = require("express");
const { Login, Logout, RefreshToken } = require("../controllers/auth.js");
const { authenticateJWT } = require("../middleware/verifyJwtToken.js");

const router = express.Router();

router.post("/login", Login);
router.post("/refreshToken", authenticateJWT, RefreshToken);
router.delete("/logout", authenticateJWT, Logout);

module.exports = router;

const express = require("express");
const { UserDetails } = require("./schema");
const router = express.Router();

router.post("/", async (req, res) => {
  // Checking If the User are already registered
  const isUserRegistered = await UserDetails.findOne({
    username: req.body.username,
  });

  if (isUserRegistered) {
    return res
      .status(200)
      .send({ isUserRegistered: true, userDetails: isUserRegistered });
  }
  return res.status(203).send({ isUserRegistered: false, userDetails: null });
});

module.exports = router;

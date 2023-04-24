const express = require("express");
const { UserDetails } = require("./schema");
const router = express.Router();

router.get("/", async (req, res) => {
  // Get All Registered Users on the network
  const allUsers = await UserDetails.find({});

  return res.status(200).send(allUsers);
});

module.exports = router;

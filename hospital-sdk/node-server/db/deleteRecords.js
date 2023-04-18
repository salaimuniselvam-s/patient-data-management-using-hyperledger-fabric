const express = require("express");
const { UserDetails } = require("./schema");
const router = express.Router();

router.get("/", (req, res) => {
  // Resetting All Records
  UserDetails.deleteMany({})
    .then(() => {
      return res.status(200).send("All user details deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(400)
        .send("Deletion of Records Failed.Please Try Again");
    });
});

module.exports = router;

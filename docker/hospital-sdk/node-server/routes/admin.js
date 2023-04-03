const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");
const {
  createDoctor,
  getAllPatients,
  createPatient,
} = require("../controllers/admin");

const router = express.Router();

//  Admin Routes //
router.post("/doctors/register", authenticateJWT, createDoctor);
router.get("/patients/_all", authenticateJWT, getAllPatients);
router.post("/patients/register", authenticateJWT, createPatient);

module.exports = router;

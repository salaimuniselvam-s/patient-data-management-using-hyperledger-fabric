const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");
const {
  createDoctor,
  getAllPatients,
  createPatient,
  getAllDoctors,
} = require("../controllers/admin");

const router = express.Router();

//  Admin Routes //
// Authentication is removed on registration for Demo Purposes
// In Real Use Cases, We have to let the admin to register onto the fabric
// router.post("/doctors/register", authenticateJWT, createDoctor);
// router.post("/patients/register", authenticateJWT, createPatient);
router.get("/patients/_all", authenticateJWT, getAllPatients);
router.get("/doctors/_all", authenticateJWT, getAllDoctors);
router.post("/doctors/register", createDoctor);
router.post("/patients/register", createPatient);

module.exports = router;

const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");
const {
  updatePatientMedicalDetails,
  getDoctorById,
} = require("../controllers/doctors");

const router = express.Router();

// Doctor Routes //

router.patch(
  "/patients/:patientId/details/medical",
  authenticateJWT,
  updatePatientMedicalDetails
);
router.get(
  // "/:hospitalId([0-9]+)/:doctorId(HOSP[0-9]+-DOC[0-9]+)",
  "/:hospitalId/:doctorId",
  authenticateJWT,
  getDoctorById
);

module.exports = router;

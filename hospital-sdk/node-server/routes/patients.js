const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");
const {
  getPatientById,
  updatePatientPersonalDetails,
  getPatientHistoryById,
  getDoctorsByHospitalId,
  grantAccessToDoctor,
  revokeAccessFromDoctor,
} = require("../controllers/patients");

const router = express.Router();

//  Patient Routes //
router.get("/:patientId", authenticateJWT, getPatientById);
router.patch(
  "/:patientId/update/personaldetails",
  authenticateJWT,
  updatePatientPersonalDetails
);
router.get("/:patientId/history", authenticateJWT, getPatientHistoryById);
router.get(
  // "/doctors/:hospitalId([0-9]+)/_all",
  "/doctors/:hospitalId/_all",
  authenticateJWT,
  getDoctorsByHospitalId
);
router.patch(
  "/:patientId/grant/:doctorId",
  authenticateJWT,
  grantAccessToDoctor
);
router.patch(
  "/:patientId/revoke/:doctorId",
  authenticateJWT,
  revokeAccessFromDoctor
);

module.exports = router;

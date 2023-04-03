const express = require("express");
const { authenticateJWT } = require("../middleware/verifyJwtToken");

const router = express.Router();

//  Patient Routes //
router.get("/patients/:patientId", authenticateJWT, getPatientById);
router.patch(
  "/patients/:patientId/details/personal",
  authenticateJWT,
  updatePatientPersonalDetails
);
router.get(
  "/patients/:patientId/history",
  authenticateJWT,
  getPatientHistoryById
);
router.get(
  "/doctors/:hospitalId([0-9]+)/_all",
  authenticateJWT,
  getDoctorsByHospitalId
);
router.patch(
  "/patients/:patientId/grant/:doctorId",
  authenticateJWT,
  grantAccessToDoctor
);
router.patch(
  "/patients/:patientId/revoke/:doctorId",
  authenticateJWT,
  revokeAccessFromDoctor
);

module.exports = router;

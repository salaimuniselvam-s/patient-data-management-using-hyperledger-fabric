const { ROLE_DOCTOR, capitalize, validateRole } = require("../utils/utils.js");
const network = require("../../fabric-network/app.js");

/**
 * @param  {Request} req Body must be a json, role in the header and patientId in the url
 * @param  {Response} res A 200 response if patient is updated successfully else a 500 response with s simple message json
 * @description Updates an existing asset(patient medical details) in the ledger. This method can be executed only by the doctor.
 */
const updatePatientMedicalDetails = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  const isValidate = await validateRole([ROLE_DOCTOR], userRole, res);
  if (isValidate) return res.status(401).json({ message: "Unauthorized Role" });
  let args = req.body;
  args.patientId = req.params.patientId;
  args.changedBy = req.headers.username;
  args.doctorId = req.headers.username;
  args = [JSON.stringify(args)];
  // Set up and connect to Fabric Gateway
  const networkObj = await network.connectToNetwork(req.headers.username);
  if (networkObj.error) return res.status(400).send(networkObj.error);
  // Invoke the smart contract function
  const response = await network.invoke(
    networkObj,
    false,
    capitalize(userRole) + "Contract:updatePatientMedicalDetails",
    args
  );
  response.error
    ? res.status(500).send(response.error)
    : res.status(200).send("Successfully Updated Patient Details.");
};

/**
 * @param  {Request} req role in the header and hospitalId, doctorId in the url
 * @param  {Response} res A 200 response if doctor is present else a 500 response with a error json
 * @description This method retrives an existing doctor
 */
const getDoctorById = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  const isValidate = await validateRole([ROLE_DOCTOR], userRole, res);
  if (isValidate) return res.status(401).json({ message: "Unauthorized Role" });
  const hospitalId = parseInt(req.params.hospitalId);
  // Set up and connect to Fabric Gateway
  const userId =
    hospitalId === 1
      ? "hosp1admin"
      : hospitalId === 2
      ? "hosp2admin"
      : "hosp3admin";
  const doctorId = req.headers.username;
  const networkObj = await network.connectToNetwork(userId);
  if (networkObj.error) return res.status(400).send(networkObj.error);
  // Use the gateway and identity service to get all users enrolled by the CA
  const response = await network.getAllDoctorsByHospitalId(
    networkObj,
    hospitalId
  );
  // Filter the result using the doctorId
  response.error
    ? res.status(500).send(response.error)
    : res.status(200).send(
        response.filter(function (response) {
          return response.id === doctorId;
        })[0]
      );
};

module.exports = { getDoctorById, updatePatientMedicalDetails };

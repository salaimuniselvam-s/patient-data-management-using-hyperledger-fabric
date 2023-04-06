const {
  ROLE_ADMIN,
  ROLE_DOCTOR,
  capitalize,
  getMessage,
  validateRole,
} = require("../utils/utils.js");
const network = require("../../fabric-network/app.js");

/**
 * @param  {Request} req Body must be a patient json and role in the header
 * @param  {Response} res 201 response if asset is created else 400 with a simple json message
 * @description Creates a patient as an user adds the patient to the wallet and an asset(patient) is added to the ledger
 */

const createPatient = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  const isValidate = await validateRole([ROLE_ADMIN], userRole, res);
  if (isValidate) return res.status(401).json({ message: "Unauthorized Role" });
  // Set up and connect to Fabric Gateway using the username in header
  const networkObj = await network.connectToNetwork(req.headers.username);
  if (networkObj.error) return res.status(400).send(networkObj.error);

  // Generally we create patient id by ourself so if patient id is not present in the request then fetch last id
  // from ledger and increment it by one. Since we follow patient id pattern as "PID0", "PID1", ...
  // 'slice' method omits first three letters and take number
  if (
    !("patientId" in req.body) ||
    req.body.patientId === null ||
    req.body.patientId === ""
  ) {
    const lastId = await network.invoke(
      networkObj,
      true,
      capitalize(userRole) + "Contract:getLatestPatientId"
    );
    req.body.patientId = "PID" + (parseInt(lastId.slice(3)) + 1);
  }

  // When password is not provided in the request while creating a patient record.

  if (
    !("password" in req.body) ||
    req.body.password === null ||
    req.body.password === ""
  ) {
    req.body.password = Math.random().toString(36).slice(-8);
  }

  req.body.changedBy = req.headers.username;

  // The request present in the body is converted into a single json string
  const data = JSON.stringify(req.body);
  const args = [data];
  // Invoke the smart contract function

  const createPatientRes = await network.invoke(
    networkObj,
    false,
    capitalize(userRole) + "Contract:createPatient",
    args
  );

  if (createPatientRes.error) {
    return res.status(400).send(createPatientRes.error);
  }

  // Enrol and register the user with the CA and adds the user to the wallet.
  const userData = JSON.stringify({
    hospitalId: req.body.hospitalId,
    userId: req.body.patientId,
  });
  const registerUserRes = await network.registerUser(userData);
  if (registerUserRes.error) {
    await network.invoke(
      networkObj,
      false,
      capitalize(userRole) + "Contract:deletePatient",
      req.body.patientId
    );
    return res.send(registerUserRes.error);
  }

  res
    .status(201)
    .send(
      getMessage(
        false,
        "Successfully registered Patient.",
        req.body.patientId,
        req.body.password
      )
    );
};

/**
 * @param  {Request} req Body must be a doctor json and role in the header
 * @param  {Response} res 201 response if asset is created else 400 with a simple json message
 * @description Creates a doctor as an user adds the doctor to the wallet
 */
const createDoctor = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  let { hospitalId, username, password } = req.body;
  hospitalId = parseInt(hospitalId);

  const isValidate = await validateRole([ROLE_ADMIN], userRole, res);
  if (isValidate) return res.status(401).json({ message: "Unauthorized Role" });

  req.body.userId = username;
  req.body.role = ROLE_DOCTOR;
  req.body = JSON.stringify(req.body);
  const args = [req.body];

  // Enrol and register the user with the CA and adds the user to the wallet.
  const response = await network.registerUser(args);
  if (response.error) {
    return res.status(400).send(response.error);
  }
  return res.status(201).send(getMessage(false, response, username, password));
};

/**
 * @param  {Request} req Role in the header
 * @param  {Response} res 200 response with the json of all the assets(patients) in the ledger
 * @description Retrieves all the assets(patients) in the ledger
 */
const getAllPatients = async (req, res) => {
  try {
    // User role from the request header is validated
    const userRole = req.headers.role;
    const isValidate = await validateRole(
      [ROLE_ADMIN, ROLE_DOCTOR],
      userRole,
      res
    );
    if (isValidate)
      return res.status(401).json({ message: "Unauthorized Role" });
    // Set up and connect to Fabric Gateway using the username in header
    const networkObj = await network.connectToNetwork(req.headers.username);
    if (networkObj.error) return res.status(400).send(networkObj.error);
    // Invoke the smart contract function
    const response = await network.invoke(
      networkObj,
      true,
      capitalize(userRole) + "Contract:queryAllPatients",
      userRole === ROLE_DOCTOR ? req.headers.username : [""]
    );
    const parsedResponse = await JSON.parse(response);
    res.status(200).send(parsedResponse);
  } catch (err) {
    console.log(err);
    res.status(405).send("Unable to Get All Patient Records..");
  }
};

module.exports = { getAllPatients, createDoctor, createPatient };

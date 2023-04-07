const {
  ROLE_ADMIN,
  ROLE_DOCTOR,
  capitalize,
  getMessage,
  validateRole,
  ROLE_PATIENT,
} = require("../utils/utils.js");
const network = require("../../fabric-network/app.js");
const UserDetails = require("../db/schema.js");

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

  req.body.patientId = req.body.username;

  // When password is not provided in the request
  if (
    !("password" in req.body) ||
    req.body.password === null ||
    req.body.password === ""
  ) {
    return res
      .status(405)
      .send(
        "Password Cannot be null.Please Enter Valid Password & Try Again.."
      );
  }

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

  const patientDetails = new UserDetails({
    username: req.body.username,
    password: req.body.password,
    role: ROLE_PATIENT,
  });

  patientDetails
    .save()
    .then(() => console.log("Patient Details saved to database"))
    .catch((error) => {
      console.error(error);
      return res
        .status(406)
        .send(
          getMessage(
            false,
            "Successfully registered on Fabric. But Failed to Update Creditials into MongoDB Database",
            username,
            password
          )
        );
    });

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
  const doctorDetails = new UserDetails({
    username: username,
    password: password,
    role: ROLE_DOCTOR,
  });

  doctorDetails
    .save()
    .then(() => console.log("Doctor Details saved to database"))
    .catch((error) => {
      console.error(error);
      return res
        .status(406)
        .send(
          getMessage(
            false,
            "Successfully registered on Fabric. But Failed to Update Creditials into MongoDB Database",
            username,
            password
          )
        );
    });
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

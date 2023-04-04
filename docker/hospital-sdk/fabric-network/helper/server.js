const FabricCAServices = require("fabric-ca-client");
const { buildCCPHosp1, buildWallet, buildCCPHosp2 } = require("../AppUtil");
const { enrollAdmin, buildCAClient } = require("../CAUtil");
const {
  registerUser,
  connectToNetwork,
  invoke,
  getAllDoctorsByHospitalId,
} = require("../app");
const { Wallets } = require("fabric-network");
const path = require("path");
const patientRecord = require("../../../hospital-chaincode/lib/initLedger.json");

const walletPath = path.join(process.cwd(), "../../fabric-network/wallet/");
async function buildWallets() {
  return buildWallet(Wallets, walletPath);
}

async function createAdminIdentity(orgId) {
  const orgMspId = `Hospital${orgId}MSP`;
  // const adminUserId = `hosp${orgId}admin`;
  // const adminUserPasswd = `hosp${orgId}adminpw`;
  const adminUserId = `admin`;
  const adminUserPasswd = `adminpw`;
  const wallet = await buildWallets();

  const ccp = orgId == 1 ? buildCCPHosp1() : buildCCPHosp2();
  const caClient = buildCAClient(
    FabricCAServices,
    ccp,
    `ca.hospital${orgId}.geakminds.com`
  );

  enrollAdmin(caClient, wallet, orgMspId, adminUserId, adminUserPasswd);
}

const jsonStringify = (input) => JSON.stringify(input);

async function listWallet() {
  const wallet = await buildWallets();
  console.log(await wallet.list());
}

async function ValidateChaincodeFunction(networkObj) {
  // Validating Query Functions in Contract
  // PrimaryContract
  // invoke(networkObj, true, "readPatient", ["PID4"]);
  // invoke(networkObj, true, "patientExists", ["PID10"]);
  // PatientContract
  // invoke(networkObj, true, "PatientContract:readPatient", ["PID4"]);
  // invoke(networkObj, false, "PatientContract:deletePatient", ["PID4"]);
  // invoke(networkObj, true, "PatientContract:readPatient", ["PID5"]);
  // AdminContract
  // invoke(networkObj, false, "AdminContract:deletePatient", [
  //   jsonStringify("PID5"),
  // ]);
  // invoke(networkObj, true, "AdminContract:queryAllPatients", "");
  // invoke(networkObj, true, "AdminContract:queryPatientsByFirstName", [
  //   "Monica",
  // ]);
  // invoke(networkObj, true, "AdminContract:queryPatientsByLastName", [
  //   "Klaproth",
  // ]);
  // invoke(networkObj, true, "AdminContract:getLatestPatientId", "");
  // invoke(networkObj, false, "AdminContract:createPatient", [
  //   jsonStringify({
  //     ...patientRecord[3],
  //     firstName: "sms6",
  //     lastName: "76",
  //     patientId: "PID5",
  //   }),
  // ]);
  // Doctor Contract
  // invoke(networkObj, true, "DoctorContract:queryAllPatients", [
  //   jsonStringify("DIS1"),
  // ]);
  // invoke(networkObj, true, "DoctorContract:queryAllPatients", ["DIS1"]);
  // invoke(networkObj, true, "DoctorContract:getPatientHistory", ["PID1"]);
}

const DOCTOR = jsonStringify({
  hospitalId: 1,
  userId: "sms7",
  firstName: "Rajesh",
  lastName: "Kumar",
  speciality: "Neurosurgery",
  role: "doctor",
});

async function main() {
  // Creating Admin Identities
  // createAdminIdentity(1);

  // List Wallets
  // listWallet();

  // Connecting to the Fabric Network
  const networkObj = await connectToNetwork("admin");

  // Validating Chaincode
  // ValidateChaincodeFunction(networkObj);

  // Register Doctor
  // registerUser(DOCTOR);
  // GetAllDoctorsByHospital
  console.log(await getAllDoctorsByHospitalId(networkObj, 1));
}

main();

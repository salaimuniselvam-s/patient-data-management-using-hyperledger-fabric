/**
 * @author Salai Muni Selvam
 * @email salaimuniselvam7@gmail.com
 * @desc The file which interacts with the fabric network.
 */

const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const { buildCAClient, registerAndEnrollUser } = require("./CAUtil.js");
const {
  buildCCPHosp3,
  buildCCPHosp2,
  buildCCPHosp1,
  buildWallet,
} = require("./AppUtil.js");
require("dotenv").config();
const isDocker = process.env.DOCKER_ENV ? true : false;

const channelName = "hospital-channel";
const chaincodeName = "hospitalcontract";
const mspHosp1 = "Hospital1MSP";
const mspHosp2 = "Hospital2MSP";
const mspHosp3 = "Hospital3MSP";
const walletPath = path.join(__dirname, "wallet");

/**
 * @author Salai Muni Selvam
 * @param  {string} doctorID
 * @return {networkObj} networkObj if all paramters are correct, the networkObj consists of contract, network, gateway
 * @return {string} response error if there is a error in the method
 * @description Connects to the network using the username - doctorID, networkObj contains the paramters using which
 * @description a connection to the fabric network is possible.
 */
exports.connectToNetwork = async function (doctorID) {
  const gateway = new Gateway();
  const ccp = buildCCPHosp1();

  try {
    const walletPath = path.join(process.cwd(), "../fabric-network/wallet/");

    const wallet = await buildWallet(Wallets, walletPath);
    const userExists = await wallet.get(doctorID);

    if (!userExists) {
      console.log(
        "An identity for the user " + doctorID + " does not exist in the wallet"
      );
      console.log("Register before retrying");
      const response = {};
      response.error =
        "An identity for the user " +
        doctorID +
        " does not exist in the wallet. Register " +
        doctorID +
        " first";
      return response;
    }

    /**
     * setup the gateway instance
     *  he user will now be able to create connections to the fabric network and be able to
     * submit transactions and query. All transactions submitted by this gateway will be
     * signed by this user using the credentials stored in the wallet.
     */
    // using asLocalhost as this gateway is using a fabric network deployed locally
    await gateway.connect(ccp, {
      wallet,
      identity: doctorID,
      discovery: { enabled: true, asLocalhost: !isDocker },
    });

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chaincodeName);

    const networkObj = {
      contract: contract,
      network: network,
      gateway: gateway,
    };
    console.log("Succesfully connected to the network.");
    return networkObj;
  } catch (error) {
    console.log(`Error processing transaction. ${error}`);
    console.log(error.stack);
    const response = {};
    response.error = error;
    return response;
  }
};

/**
 * @author Salai Muni Selvam
 * @param  {*} networkObj the object which is given when connectToNetwork is executed
 * @param  {boolean} isQuery true if retieving from ledger, else false in the case of add a transaction to the ledger.
 * @param  {string} func must be the function name in the chaincode.
 * @param  {string} args - a json string, if there are mutiple args, the args must be a json as one string
 * @return {string} response if the transaction was successful
 * @return {string} response error otherwise
 * @description A common function to interact with the ledger
 */
exports.invoke = async function (networkObj, isQuery, func, args = "") {
  try {
    if (isQuery === true) {
      const response = await networkObj.contract.evaluateTransaction(
        func,
        args
      );
      console.log(response.toString("utf8"));
      await networkObj.gateway.disconnect();
      return response;
    } else {
      if (args) {
        args = JSON.parse(args[0]);
        args = JSON.stringify(args);
      }
      const response = await networkObj.contract.submitTransaction(func, args);
      await networkObj.gateway.disconnect();
      return response;
    }
  } catch (error) {
    const response = {};
    response.error = error;
    console.error(`Failed to submit transaction: ${error}`);
    return response;
  }
};

/**
 * @author Salai Muni Selvam
 * @param  {string} attributes JSON string in which userId, hospitalId and role must be present.
 * @description For patient attributes also contain the patient object
 * @description Creates a patient/doctor and adds to the wallet to the given hospitalId
 */
exports.registerUser = async function (attributes) {
  const attrs = JSON.parse(attributes);
  const hospitalId = parseInt(attrs.hospitalId);
  const userId = attrs.userId;

  if (!userId || !hospitalId) {
    const response = {};
    response.error =
      "Error! You need to fill all fields before you can register!";
    return response;
  }

  try {
    const wallet = await buildWallet(Wallets, walletPath);
    // TODO: Must be handled in a config file instead of using if
    if (hospitalId === 1) {
      const ccp = buildCCPHosp1();
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital1.geakminds.com"
      );
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspHosp1,
        userId,
        "hosp1admin", // identities in the fabric-ca-server-config.yaml
        attributes
      );
    } else if (hospitalId === 2) {
      const ccp = buildCCPHosp2();
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital2.geakminds.com"
      );
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspHosp2,
        userId,
        "hosp2admin",
        attributes
      );
    } else if (hospitalId === 3) {
      const ccp = buildCCPHosp3();
      const caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital3.geakminds.com"
      );
      await registerAndEnrollUser(
        caClient,
        wallet,
        mspHosp3,
        userId,
        "hosp3admin",
        attributes
      );
    }
    console.log(`Successfully registered user: + ${userId}`);
    const response = "Successfully registered user: " + userId;
    return response;
  } catch (error) {
    console.error(`Failed to register user + ${userId} + : ${error}`);
    const response = {};
    response.error = error;
    return response;
  }
};

/**
 * @param  {NetworkObj} networkObj The object which is generated when connectToNetwork is executed
 * @param  {Number} hospitalId
 * @return {JSON} Returns an JSON array consisting of all doctor object.
 * @description Retrieves all the users(doctors) based on user type(doctor) and hospitalId
 */
exports.getAllDoctorsByHospitalId = async function (networkObj, hospitalId) {
  // Get the User from the identity context
  const users = networkObj.gateway.identityContext.user;
  let caClient;
  const result = [];
  try {
    // TODO: Must be handled in a config file instead of using if
    if (hospitalId === 1) {
      const ccp = buildCCPHosp1();
      caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital1.geakminds.com"
      );
    } else if (hospitalId === 2) {
      const ccp = buildCCPHosp2();
      caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital2.geakminds.com"
      );
    } else if (hospitalId === 3) {
      const ccp = buildCCPHosp3();
      caClient = buildCAClient(
        FabricCAServices,
        ccp,
        "ca.hospital3.geakminds.com"
      );
    }

    // Use the identity service to get the user enrolled using the respective CA
    const idService = caClient.newIdentityService();
    const userList = await idService.getAll(users);

    // for all identities the attrs can be found
    const identities = userList.result.identities;

    for (let i = 0; i < identities.length; i++) {
      tmp = {};
      if (identities[i].type === "client") {
        tmp.id = identities[i].id;
        tmp.role = identities[i].type;
        attributes = identities[i].attrs;
        // Doctor object will consist of firstName and lastName
        for (let j = 0; j < attributes.length; j++) {
          if (
            attributes[j].name.endsWith("Name") ||
            attributes[j].name === "role" ||
            attributes[j].name === "speciality"
          ) {
            tmp[attributes[j].name] = attributes[j].value;
          }
        }
        result.push(tmp);
      }
    }
  } catch (error) {
    console.error(`Unable to get all doctors : ${error}`);
    const response = {};
    response.error = error;
    return response;
  }

  return result.filter(function (result) {
    return result.role === "doctor";
  });
};

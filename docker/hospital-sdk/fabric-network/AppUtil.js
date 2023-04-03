/**
 * @author Salai Muni Selvam
 * @email salaimuniselvam7@gmail.com
 * @desc Referenced from https://github.com/hyperledger/fabric-samples/tree/master/test-application/javascript
 */

const fs = require("fs");
const path = require("path");

/**
 * @author Salai Muni Selvam
 * @return {ccp} ccp
 * @description Creates a connection profile and returns the network config to Hospital 1. Reads the JSON file created
 * @description When CA is created there is a json for each hospital which specfies the connection profile.
 */
exports.buildCCPHosp1 = () => {
  // load the common connection configuration file
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "hospital-network",
    "organizations",
    "peerOrganizations",
    "hospital1.geakminds.com",
    "connection-hospital1.json"
  );
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};

/**
 * @author Salai Muni Selvam
 * @return {ccp} ccp
 * @description Creates a connection profile and returns the network config to Hospital 2. Reads the JSON file created
 * @description When CA is created there is a json for each hospital which specfies the connection profile.
 */
exports.buildCCPHosp2 = () => {
  // load the common connection configuration file
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "hospital-network",
    "organizations",
    "peerOrganizations",
    "hospital2.geakminds.com",
    "connection-hospital2.json"
  );
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};

/**
 * @author Salai Muni Selvam
 * @return {ccp} ccp
 * @description Creates a connection profile and returns the network config to Hospital 3. Reads the JSON file created
 * @description When CA is created there is a json for each hospital which specfies the connection profile.
 */
exports.buildCCPHosp3 = () => {
  // load the common connection configuration file
  const ccpPath = path.resolve(
    __dirname,
    "..",
    "..",
    "hospital-network",
    "organizations",
    "peerOrganizations",
    "hospital3.geakminds.com",
    "connection-hospital3.json"
  );
  const fileExists = fs.existsSync(ccpPath);
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`);
  }
  const contents = fs.readFileSync(ccpPath, "utf8");

  // build a JSON object from the file contents
  const ccp = JSON.parse(contents);

  console.log(`Loaded the network configuration located at ${ccpPath}`);
  return ccp;
};

/**
 * @author Salai Muni Selvam
 * @param  {*} Wallets
 * @param  {string} walletPath
 * @return {wallet} wallet
 * @description If there is no wallet presents, a new wallet is created else , returns the wallet that is present.
 * @description The wallet path is in ./patient-applcation/server/src/network/wallet
 */
exports.buildWallet = async (Wallets, walletPath) => {
  // Create a new  wallet : Note that wallet is for managing identities.
  let wallet;
  if (walletPath) {
    wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Built a file system wallet at ${walletPath}`);
  } else {
    wallet = await Wallets.newInMemoryWallet();
    console.log("Built an in memory wallet");
  }

  return wallet;
};

/**
 * @author Salai Muni Selvam
 * @param  {string} inputString
 * @return {string} jsonString
 * @description Formats the string to JSON
 */
exports.prettyJSONString = (inputString) => {
  if (inputString) {
    return JSON.stringify(JSON.parse(inputString), null, 2);
  } else {
    return inputString;
  }
};
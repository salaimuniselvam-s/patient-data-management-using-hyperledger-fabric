const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  enrollAdmin,
} = require("../../fabric-network/CAUtil.js");
const {
  buildCCPHosp3,
  buildWallet,
} = require("../../fabric-network/AppUtil.js");
const adminHospital3 = "hosp3admin";
const adminHospital3Passwd = "hosp3adminpw";

const mspHosp3 = "Hospital3MSP";
const walletPath = path.join(__dirname, "../../fabric-network/wallet");

/**
 * @description This functions enrolls the admin of Hospital 3
 */
exports.enrollAdminHosp3 = async function () {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPHosp3();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      "ca.hospital3.geakminds.com"
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
    await enrollAdmin(
      caClient,
      wallet,
      mspHosp3,
      adminHospital3,
      adminHospital3Passwd
    );

    console.log(
      "msg: Successfully enrolled admin user " +
        adminHospital3 +
        " and imported it into the wallet"
    );
  } catch (error) {
    console.error(
      `Failed to enroll admin user ' + ${adminHospital3} + : ${error}`
    );
    process.exit(1);
  }
};

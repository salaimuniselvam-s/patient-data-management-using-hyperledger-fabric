const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  enrollAdmin,
} = require("../../fabric-network/CAUtil.js");
const {
  buildCCPHosp2,
  buildWallet,
} = require("../../fabric-network/AppUtil.js");
const storeAdminCredentials = require("./storeAdminCredentials.js");
const { ROLE_ADMIN } = require("../utils/utils.js");
const { hashPassword } = require("../utils/hashPassword.js");
require("dotenv").config();
const salt = process.env.SAMPLE_SALT;

const adminHospital2 = "hosp2admin";
const adminHospital2Passwd = "hosp2adminpw";

const mspHosp2 = "Hospital2MSP";
const walletPath = path.join(__dirname, "../../fabric-network/wallet");

/**
 * @description This functions enrolls the admin of Hospital 2
 */
async function enrollAdminHosp2() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPHosp2();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      "ca.hospital2.geakminds.com"
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
    await enrollAdmin(
      caClient,
      wallet,
      mspHosp2,
      adminHospital2,
      adminHospital2Passwd
    );

    console.log(
      "msg: Successfully enrolled admin user " +
        adminHospital2 +
        " and imported it into the wallet"
    );

    await storeAdminCredentials({
      username: adminHospital2,
      password: hashPassword(adminHospital2Passwd, salt),
      role: ROLE_ADMIN,
      hospitalId: "2",
    });
  } catch (error) {
    console.error(
      `Failed to enroll admin user ' + ${adminHospital2} + : ${error}`
    );
    process.exit(1);
  }
}

module.exports = enrollAdminHosp2;

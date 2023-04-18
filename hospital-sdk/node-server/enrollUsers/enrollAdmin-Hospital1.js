const { Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");
const path = require("path");
const {
  buildCAClient,
  enrollAdmin,
} = require("../../fabric-network/CAUtil.js");
const {
  buildCCPHosp1,
  buildWallet,
} = require("../../fabric-network/AppUtil.js");
const { ROLE_ADMIN } = require("../utils/utils.js");
const storeAdminCredentials = require("./storeAdminCredentials.js");
const { hashPassword } = require("../utils/hashPassword.js");
require("dotenv").config();
const salt = process.env.SAMPLE_SALT;

const adminHospital1 = "hosp1admin";
const adminHospital1Passwd = "hosp1adminpw";

const mspHosp1 = "Hospital1MSP";
const walletPath = path.join(__dirname, "../../fabric-network/wallet");

/**
 * @description This functions enrolls the admin of Hospital 1
 */
async function enrollAdminHosp1() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPHosp1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(
      FabricCAServices,
      ccp,
      "ca.hospital1.geakminds.com"
    );

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
    await enrollAdmin(
      caClient,
      wallet,
      mspHosp1,
      adminHospital1,
      adminHospital1Passwd
    );

    console.log(
      "msg: Successfully enrolled admin user " +
        adminHospital1 +
        " and imported it into the wallet"
    );
    await storeAdminCredentials({
      username: adminHospital1,
      password: hashPassword(adminHospital1Passwd, salt),
      role: ROLE_ADMIN,
      hospitalId: "1",
    });
  } catch (error) {
    console.error(
      `Failed to enroll admin user ' + ${adminHospital1} + : ${error}`
    );
    process.exit(1);
  }
}

module.exports = enrollAdminHosp1;

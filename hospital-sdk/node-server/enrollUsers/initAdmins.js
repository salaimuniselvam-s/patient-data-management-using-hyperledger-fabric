const fs = require("fs");
const enrollAdminHosp1 = require("./enrollAdmin-Hospital1.js");
const enrollAdminHosp2 = require("./enrollAdmin-Hospital2");

const filesToCheck = [
  {
    path: "../fabric-network/wallet/hosp1admin.id",
    admin: "hosp1admin",
    fn: enrollAdminHosp1,
  },
  {
    path: "../fabric-network/wallet/hosp2admin.id",
    admin: "hosp2admin",
    fn: enrollAdminHosp2,
  },
];

const enrollAdmins = async () => {
  // Creating Wallets For Admin Only if it does not exist
  filesToCheck.forEach((filePath) => {
    fs.access(filePath.path, fs.constants.F_OK, async (err) => {
      if (err) {
        console.log(`Creating Wallet for ${filePath.admin}`);
        await filePath.fn();
      } else {
        console.log(`${filePath.admin} wallet exists`);
      }
    });
  });
};

module.exports = enrollAdmins;

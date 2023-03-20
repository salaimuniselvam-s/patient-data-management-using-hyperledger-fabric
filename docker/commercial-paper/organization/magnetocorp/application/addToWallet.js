/*
 *  SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require("fs");
const { Wallets } = require("fabric-network");
const path = require("path");

const fixtures = path.resolve(__dirname, "../../../../hospital-network");

async function main() {
  // Main try/catch block
  try {
    // A wallet stores a collection of identities
    const wallet = await Wallets.newFileSystemWallet(
      "../identity/user/isabella/wallet"
    );

    // Identity to credentials to be stored in the wallet
    const credPath = path.join(
      fixtures,
      "/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com"
    );
    const certificate = fs
      .readFileSync(
        path.join(
          credPath,
          "/msp/signcerts/User1@hospital2.geakminds.com-cert.pem"
        )
      )
      .toString();
    const privateKey = fs
      .readFileSync(path.join(credPath, "/msp/keystore/priv_sk"))
      .toString();

    // Load credentials into wallet
    const identityLabel = "isabella";

    const identity = {
      credentials: {
        certificate,
        privateKey,
      },
      mspId: "Hospital2MSP",
      type: "X.509",
    };

    await wallet.put(identityLabel, identity);
  } catch (error) {
    console.log(`Error adding to wallet. ${error}`);
    console.log(error.stack);
  }
}

main()
  .then(() => {
    console.log("done");
  })
  .catch((e) => {
    console.log(e);
    console.log(e.stack);
    process.exit(-1);
  });

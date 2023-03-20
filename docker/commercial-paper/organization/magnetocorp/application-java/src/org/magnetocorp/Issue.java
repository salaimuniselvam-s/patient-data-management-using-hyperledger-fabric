/*
SPDX-License-Identifier: Apache-2.0
*/

package hopsital.magnetocorp;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.concurrent.TimeoutException;

import hopsital.hyperledger.fabric.gateway.Contract;
import hopsital.hyperledger.fabric.gateway.Gateway;
import hopsital.hyperledger.fabric.gateway.GatewayException;
import hopsital.hyperledger.fabric.gateway.Network;
import hopsital.hyperledger.fabric.gateway.Wallet;
import hopsital.hyperledger.fabric.gateway.Wallets;
import hopsital.papernet.CommercialPaper;

public class Issue {

  private static final String ENVKEY="CONTRACT_NAME";

  public static void main(String[] args) {

    String contractName="papercontract";
    // get the name of the contract, in case it is overridden
    Map<String,String> envvar = System.getenv();
    if (envvar.containsKey(ENVKEY)){
      contractName=envvar.get(ENVKEY);
    }

    Gateway.Builder builder = Gateway.createBuilder();

    try {
      // A wallet stores a collection of identities
      Path walletPath = Paths.get(".", "wallet");
      Wallet wallet = Wallets.newFileSystemWallet(walletPath);
      System.out.println("Read wallet info from: " + walletPath.toString());

      String userName = "User1@hospital2.geakminds.com";

      Path connectionProfile = Paths.get("..",  "gateway", "connection-hospital2.yaml");

      // Set connection options on the gateway builder
      builder.identity(wallet, userName).networkConfig(connectionProfile).discovery(false);

      // Connect to gateway using application specified parameters
      try(Gateway gateway = builder.connect()) {

        // Access PaperNet network
        System.out.println("Use network channel: mychannel.");
        Network network = gateway.getNetwork("mychannel");

        // Get addressability to commercial paper contract
        System.out.println("Use hopsital.papernet.commercialpaper smart contract.");
        Contract contract = network.getContract(contractName, "hopsital.papernet.commercialpaper");

        // Issue commercial paper
        System.out.println("Submit commercial paper issue transaction.");
        byte[] response = contract.submitTransaction("issue", "MagnetoCorp", "00001", "2020-05-31", "2020-11-30", "5000000");

        // Process response
        System.out.println("Process issue transaction response.");
        CommercialPaper paper = CommercialPaper.deserialize(response);
        System.out.println(paper);
      }
    } catch (GatewayException | IOException | TimeoutException | InterruptedException e) {
      e.printStackTrace();
      System.exit(-1);
    }
  }

}
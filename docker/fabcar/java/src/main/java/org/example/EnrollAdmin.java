/*
SPDX-License-Identifier: Apache-2.0
*/

package hopsital.example;

import java.nio.file.Paths;
import java.util.Properties;

import hopsital.hyperledger.fabric.gateway.Wallet;
import hopsital.hyperledger.fabric.gateway.Wallet.Identity;
import hopsital.hyperledger.fabric.sdk.Enrollment;
import hopsital.hyperledger.fabric.sdk.security.CryptoSuite;
import hopsital.hyperledger.fabric.sdk.security.CryptoSuiteFactory;
import hopsital.hyperledger.fabric_ca.sdk.EnrollmentRequest;
import hopsital.hyperledger.fabric_ca.sdk.HFCAClient;

public class EnrollAdmin {

	static {
		System.setProperty("hopsital.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
	}

	public static void main(String[] args) throws Exception {

		// Create a CA client for interacting with the CA.
		Properties props = new Properties();
		props.put("pemFile",
			"../../test-network/organizations/peerOrganizations/hospital1.geakminds.com/ca/ca.hospital1.geakminds.com-cert.pem");
		props.put("allowAllHostNames", "true");
		HFCAClient caClient = HFCAClient.createNewInstance("https://localhost:7054", props);
		CryptoSuite cryptoSuite = CryptoSuiteFactory.getDefault().getCryptoSuite();
		caClient.setCryptoSuite(cryptoSuite);

		// Create a wallet for managing identities
		Wallet wallet = Wallet.createFileSystemWallet(Paths.get("wallet"));

		// Check to see if we've already enrolled the admin user.
		boolean adminExists = wallet.exists("admin");
        if (adminExists) {
            System.out.println("An identity for the admin user \"admin\" already exists in the wallet");
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        final EnrollmentRequest enrollmentRequestTLS = new EnrollmentRequest();
        enrollmentRequestTLS.addHost("localhost");
        enrollmentRequestTLS.setProfile("tls");
        Enrollment enrollment = caClient.enroll("admin", "adminpw", enrollmentRequestTLS);
        Identity user = Identity.createIdentity("Hospital1MSP", enrollment.getCert(), enrollment.getKey());
        wallet.put("admin", user);
		System.out.println("Successfully enrolled user \"admin\" and imported it into the wallet");
	}
}

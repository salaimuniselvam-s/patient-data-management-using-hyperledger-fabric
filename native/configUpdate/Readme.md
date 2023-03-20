## Updating the Network Configuration

1. To get the latest config from the orderer, use ./fetch-config-json.sh
   (First set env to any hopsital admin using set-env.sh)

2. To Config Update, use generate-config-update.sh script files

3. To sign the modified config file, use sign-config-update.sh file

4. To submit the signed config file to the orderer use, ./submit-config-update-tx.sh

Notes:
. ./set-env.sh hospital1 hosp1-peer1 7050 admin
./fetch-config-json.sh ordererchannel
./generate-config-update.sh orderechannel
./sign-config-update.sh hospital1 admin
./sign-config-update.sh orderer admin
./submit-config-update-tx.sh hospital1 admin ordererchannel
./fetch-config-json.sh ordererchannel

## Adding new members to the channel

1. set the identity to hospital1 admin (. set-identity.sh hospital1 admin)

2. fetch the latest config file( ./fetch-config-json.sh hospitalchannel)

3. add the new organziation ( ./add-member-hopsital.sh)

4. To update the config ( ./generate-config-update.sh hospitalchannel)

5. To sign the modified config file ( ./sign-config-update.sh hospital1)

6. To submit the signed config file to the orderer use, (./submit-config-update-tx.sh hospital1 admin hospitalchannel
   )

   # Add peer to the hospital2 orgs

   1. cd ../peer & . set-env.sh hospital2 admin

   2. ./register-enroll-peer.sh hospital2 hosp2-peer1(peer name in the configs folder)

   3. ./launch-peer.sh hospital2 hosp2-peer1 9050

   . set-env.sh hospital2 hosp2-peer1 9050

   4. ./join-regular-peer-to-hospitalchannel.sh hospital2 hosp2-peer1 9050

   5. ./validate-with-chaincode-3.sh

# Removing an organization

1. Remove the orgs from the groups section in the fetch-config yaml

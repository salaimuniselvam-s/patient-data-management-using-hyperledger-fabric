#!/bin/bash
#
# Validates the working of : Hospital1 hosp1-peer & Hospital2 hosp2-peer1
#
# Installs | commits on Hospital1 hosp1-peer
source ./validate-with-chaincode-1.sh

# Install the chaincode on Hospital2 hosp2-peer1
PEER_NAME="hosp2-peer1"
PEER_BASE_PORT=9050
source  set-env.sh  hospital2 hosp2-peer1 9050 admin


echo "====> Step 10. Installing $PACKAGE_NAME on Hospital2 hosp2-peer1"
. set-identity.sh hospital2 admin
peer lifecycle chaincode install  $CC2_PACKAGE_FOLDER/$PACKAGE_NAME


# Get the package ID
cc_get_package_id

echo "====> Step 11. Approve the chaincode for Hospital2"
peer lifecycle chaincode approveformyorg --channelID $CC_CHANNEL_ID  --name $CC_NAME \
            --version $CC_VERSION --package-id $PACKAGE_ID --sequence $CC2_SEQUENCE \
            $CC2_INIT_REQUIRED    -o $ORDERER_ADDRESS  --waitForEvent


echo "====> Step 12. Querying for value of A in hospital2 hosp2-peer1"

peer chaincode query -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["query","a"]}'

echo "====> Value of A should be SAME on Hospital1 hosp1-peer1 & Hospital2 hosp2-peer1"
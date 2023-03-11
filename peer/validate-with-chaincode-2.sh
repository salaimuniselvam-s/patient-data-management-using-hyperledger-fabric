#!/bin/bash
#
# Validates the working of : Hospital1 hosp1-peer1 & Hospital1 hosp1-peer2
#

# Installs | commits on Hospital1 hosp1-peer1
source ./validate-with-chaincode-1.sh

# Install the chaincode on Hospital1 hosp1-peer2
PEER_NAME="hosp1-peer2"
PEER_BASE_PORT=8050
source  set-env.sh  hospital1 hosp1-peer2 8050 admin


echo "====> 9. Installing $PACKAGE_NAME on Hospital1 hosp1-peer2"
peer lifecycle chaincode install  $CC2_PACKAGE_FOLDER/$PACKAGE_NAME

echo "====> 10. Querying for value of A in Hospital1 hosp1-peer2"

peer chaincode query -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["query","a"]}'

echo "====> Value of A should be SAME on Hospital1 hosp1-peer1 & hosp1-peer2"

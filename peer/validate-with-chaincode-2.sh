#!/bin/bash
#
# Validates the working of : Acme Peer1 & Acme Peer2
#

# Installs | commits on Acme peer1
source ./validate-with-chaincode-1.sh

# Install the chaincode on Acme peer2
PEER_NAME="peer2"
PEER_BASE_PORT=8050
source  set-env.sh  acme peer2 8050 admin


echo "====> 9. Installing $PACKAGE_NAME on Acme Peer2"
peer lifecycle chaincode install  $CC2_PACKAGE_FOLDER/$PACKAGE_NAME

echo "====> 10. Querying for value of A in Acme peer2"

peer chaincode query -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["query","a"]}'

echo "====> Value of A should be SAME on Acme peer1 & peer2"

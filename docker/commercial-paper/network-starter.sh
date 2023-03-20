#!/bin/bash
#
# SPDX-License-Identifier: Apache-2.0

function _exit(){
    printf "Exiting:%s\n" "$1"
    exit -1
}

# Exit on first error, print all commands.
set -ev
set -o pipefail

# Where am I?
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export FABRIC_CFG_PATH="${DIR}/../config"

cd "${DIR}/../hospital-network/"

docker kill cliDigiBank cliMagnetoCorp logspout || true
./network.sh down
./network.sh up createChannel -ca -s couchdb

# Copy the connection profiles so they are in the correct organizations.
cp "${DIR}/../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/connection-hospital1.yaml" "${DIR}/organization/digibank/gateway/"
cp "${DIR}/../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/connection-hospital2.yaml" "${DIR}/organization/magnetocorp/gateway/"

cp ${DIR}/../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com/msp/signcerts/* ${DIR}/../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com/msp/signcerts/User1@hospital1.geakminds.com-cert.pem
cp ${DIR}/../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com/msp/keystore/* ${DIR}/../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com/msp/keystore/priv_sk

cp ${DIR}/../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com/msp/signcerts/* ${DIR}/../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com/msp/signcerts/User1@hospital2.geakminds.com-cert.pem
cp ${DIR}/../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com/msp/keystore/* ${DIR}/../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com/msp/keystore/priv_sk

echo Suggest that you monitor the docker containers by running
echo "./organization/magnetocorp/configuration/cli/monitordocker.sh net_test"

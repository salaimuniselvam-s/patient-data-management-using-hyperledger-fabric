#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

export CORE_PEER_TLS_ENABLED=true

echo "========== Query chaincode package ID =========="
export CORE_PEER_MSPCONFIGPATH=../test-network/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID="Hospital1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../test-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
peer lifecycle chaincode queryinstalled >&log.txt
export PACKAGE_ID=`sed -n '/Package/{s/^Package ID: //; s/, Label:.*$//; p;}' log.txt`

echo "========== Approve definition for Hopsital1 =========="
export CORE_PEER_MSPCONFIGPATH=../test-network/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID="Hospital1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../test-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
peer lifecycle chaincode install bigdatacc.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile ../test-network/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem --channelID mychannel --signature-policy "OR('Hospital1MSP.peer', 'Hospital2MSP.peer')" --name bigdatacc --version 0 --init-required --package-id ${PACKAGE_ID} --sequence 1

echo "========== Approve definition for Hopsital2 =========="
export CORE_PEER_MSPCONFIGPATH=../test-network/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export CORE_PEER_LOCALMSPID="Hospital2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../test-network/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt
peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile ../test-network/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem --channelID mychannel --signature-policy "OR('Hospital1MSP.peer', 'Hospital2MSP.peer')" --name bigdatacc --version 0 --init-required --package-id ${PACKAGE_ID} --sequence 1

. scripts/check-commit-readiness.sh

checkCommitReadiness 1 "\"Hospital1MSP\": true" "\"Hospital2MSP\": true"
checkCommitReadiness 2 "\"Hospital1MSP\": true" "\"Hospital2MSP\": true"


echo "========== Commit the definition the mychannel =========="
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile ../test-network/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem --channelID mychannel --signature-policy "OR('Hospital1MSP.peer', 'Hospital2MSP.peer')" --name bigdatacc --version 0 --init-required --sequence 1 --waitForEvent --peerAddresses localhost:7051 --tlsRootCertFiles ../test-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ../test-network/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt


echo "========== Invoke the Init function =========="
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile ../test-network/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem  -C mychannel -n bigdatacc --isInit -c '{"Args":["Init"]}'

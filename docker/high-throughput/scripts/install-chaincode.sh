#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
export CORE_PEER_TLS_ENABLED=true

echo "========== Package a chaincode =========="
export CORE_PEER_MSPCONFIGPATH=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID="Hospital1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
peer lifecycle chaincode package bigdatacc.tar.gz --path chaincode/ --lang golang --label bigdatacc_0

echo "========== Installing chaincode on peer0.hospital1 =========="
export CORE_PEER_MSPCONFIGPATH=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:7051
export CORE_PEER_LOCALMSPID="Hospital1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
peer lifecycle chaincode install bigdatacc.tar.gz


echo "========== Installing chaincode on peer0.hospital2 =========="
export CORE_PEER_MSPCONFIGPATH=../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp
export CORE_PEER_ADDRESS=localhost:9051
export CORE_PEER_LOCALMSPID="Hospital2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt
peer lifecycle chaincode install bigdatacc.tar.gz

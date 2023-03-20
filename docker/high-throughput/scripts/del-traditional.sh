#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

source scripts/setenv.sh

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile ../test-network/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem -C mychannel -n bigdatacc -c '{"Args":["delstandard","'$1'"]}'

if [[ $0 = *"runPeer.sh" || ! $1 ]];
then
    echo "You might have forgotten to add '.' before './runPeer.sh'."
    echo "You must specify which hospital peer to use as the second argument."
else
export PATH_TO_CRYPTO_FILES=${PWD}/../
export PATH=${PWD}/../../bin:${PWD}:$PATH
export FABRIC_CFG_PATH=$PWD/../../config/

export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PATH_TO_CRYPTO_FILES}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem
export PEER0_ORG1_CA=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
export PEER0_ORG2_CA=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt
export PEER0_ORG3_CA=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/ca.crt


setOrdererGlobals() {
  export CORE_PEER_LOCALMSPID="OrdererMSP"
  export CORE_PEER_TLS_ROOTCERT_FILE=${PATH_TO_CRYPTO_FILES}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem
  export CORE_PEER_MSPCONFIGPATH=${PATH_TO_CRYPTO_FILES}/organizations/ordererOrganizations/geakminds.com/users/Admin@geakminds.com/msp
}


# Set environment variables for the peer hopsital
setGlobals() {
  local USING_ORG=""
  if [ -z "$OVERRIDE_ORG" ]; then
    USING_ORG=$1
  else
    USING_ORG="${OVERRIDE_ORG}"
  fi
  echo "Using hospital ${USING_ORG}"
  if [ $USING_ORG -eq 1 ]; then
    export CORE_PEER_LOCALMSPID="Hospital1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
  elif [ $USING_ORG -eq 2 ]; then
    export CORE_PEER_LOCALMSPID="Hospital2MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG2_CA
    export CORE_PEER_MSPCONFIGPATH=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp
    export CORE_PEER_ADDRESS=localhost:9051

  elif [ $USING_ORG -eq 3 ]; then
    export CORE_PEER_LOCALMSPID="Hospital3MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG3_CA
    export CORE_PEER_MSPCONFIGPATH=${PATH_TO_CRYPTO_FILES}/organizations/peerOrganizations/hospital3.geakminds.com/users/Admin@hospital3.geakminds.com/msp
    export CORE_PEER_ADDRESS=localhost:11051
  else
    echo "================== ERROR !!! HOSPITAL Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

setOrdererGlobals

setGlobals $1

fi
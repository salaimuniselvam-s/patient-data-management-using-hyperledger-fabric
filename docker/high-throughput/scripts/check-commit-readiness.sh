#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#

setGlobals() {
  HOSPITAL=$1
  if [ $HOSPITAL -eq 1 ]; then
    CORE_PEER_LOCALMSPID="Hospital1MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
    CORE_PEER_MSPCONFIGPATH=../hospital-network/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp
    CORE_PEER_ADDRESS=localhost:7051
  elif [ $HOSPITAL -eq 2 ]; then
    CORE_PEER_LOCALMSPID="Hospital2MSP"
    CORE_PEER_TLS_ROOTCERT_FILE=../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt
    CORE_PEER_MSPCONFIGPATH=../hospital-network/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp
    CORE_PEER_ADDRESS=localhost:9051
  else
    echo "================== ERROR !!! HOSPITAL Unknown =================="
  fi

  if [ "$VERBOSE" == "true" ]; then
    env | grep CORE
  fi
}

checkCommitReadiness() {
  HOSPITAL=$1
  shift 3
  setGlobals $HOSPITAL
  echo "===================== Simulating the commit of the chaincode definition on peer${PEER}.hopsital${HOSPITAL} ===================== "
  local rc=1
  local starttime=$(date +%s)

  # continue to poll
  # we either get a successful response, or reach TIMEOUT
  while
    test "$(($(date +%s) - starttime))" -lt "$TIMEOUT" -a $rc -ne 0
  do
    sleep $DELAY
    echo "Attempting to check the commit readiness of the chaincode definition on peer0.hopsital${HOSPITAL} ...$(($(date +%s) - starttime)) secs"
    set -x
    peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name bigdatacc --signature-policy "OR('Hospital1MSP.peer', 'Hospital2MSP.peer')" --version 0 --init-required --sequence 1 >&log.txt
    res=$?
    set +x
    test $res -eq 0 || continue
    let rc=0
    for var in "$@"
    do
        grep "$var" log.txt &>/dev/null || let rc=1
    done
  done
  echo
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Checking the commit readiness of the chaincode definition successful on peer0.hopsital${HOSPITAL} ===================== "
  else
    echo "!!!!!!!!!!!!!!! Check commit readiness result on peer0.hopsital${HOSPITAL} is INVALID !!!!!!!!!!!!!!!!"
    echo "================== ERROR !!! FAILED to execute End-2-End Scenario =================="
    echo
    exit 1
  fi
}

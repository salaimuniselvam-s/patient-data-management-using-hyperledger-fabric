
CHANNEL_NAME="$1"
CC_SRC_LANGUAGE="$2"
VERSION="$3"
DELAY="$4"
MAX_RETRY="$5"
VERBOSE="$6"
: ${CHANNEL_NAME:="hospital-channel"}
: ${CC_SRC_LANGUAGE:="javascript"}
: ${VERSION:="1"}
: ${DELAY:="3"}
: ${MAX_RETRY:="5"}
: ${VERBOSE:="false"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`

FABRIC_CFG_PATH=$PWD/../config/

if [ "$CC_SRC_LANGUAGE" = "javascript" ]; then
	CC_RUNTIME_LANGUAGE=node # chaincode runtime language is node.js
	CC_SRC_PATH="../hospital-chaincode/"

else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, java, javascript, and typescript
	exit 1
fi

# import utils
. scripts/envVar.sh


packageChaincode() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  set -x
  peer lifecycle chaincode package hospital-chaincode.tar.gz --path ${CC_SRC_PATH} --lang ${CC_RUNTIME_LANGUAGE} --label hosipitalchaincode${VERSION} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode packaging on peer0.hopsital${HOSPITAL} has failed"
  echo "===================== Chaincode is packaged on peer0.hopsital${HOSPITAL} ===================== "
  echo
}

# installChaincode PEER HOSPITAL
installChaincode() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  set -x
  peer lifecycle chaincode install hospital-chaincode.tar.gz >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode installation on peer0.hopsital${HOSPITAL} has failed"
  echo "===================== Chaincode is installed on peer0.hopsital${HOSPITAL} ===================== "
  echo
}

# queryInstalled PEER HOSPITAL
queryInstalled() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  set -x
  peer lifecycle chaincode queryinstalled >&log.txt
  res=$?
  set +x
  cat log.txt
	PACKAGE_ID=$(sed -n "/hosipitalchaincode${VERSION}/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
  verifyResult $res "Query installed on peer0.hopsital${HOSPITAL} has failed"
  echo PackageID is ${PACKAGE_ID}
  echo "===================== Query installed successful on peer0.hopsital${HOSPITAL} on channel ===================== "
  echo
}

# approveForMyOrg VERSION PEER HOSPITAL
approveForMyOrg() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  set -x
  # peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name hospitalcontract --version ${VERSION} --init-required --package-id ${PACKAGE_ID} --sequence ${VERSION} >&log.txt

   peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name hospitalcontract --version ${VERSION}  --package-id ${PACKAGE_ID} --sequence ${VERSION} >&log.txt
  set +x
  cat log.txt
  verifyResult $res "Chaincode definition approved on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode definition approved on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' ===================== "
  echo
}

# checkCommitReadiness VERSION PEER HOSPITAL
checkCommitReadiness() {
  HOSPITAL=$1
  shift 1
  setGlobals $HOSPITAL
  echo "===================== Checking the commit readiness of the chaincode definition on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME'... ===================== "
	local rc=1
	local COUNTER=1
	# continue to poll
  # we either get a successful response, or reach MAX RETRY
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    echo "Attempting to check the commit readiness of the chaincode definition on peer0.hopsital${HOSPITAL} secs"
    set -x
    # peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name hospitalcontract --version ${VERSION} --sequence ${VERSION} --output json --init-required >&log.txt
    peer lifecycle chaincode checkcommitreadiness --channelID $CHANNEL_NAME --name hospitalcontract --version ${VERSION} --sequence ${VERSION} --output json >&log.txt
    res=$?
    set +x
    let rc=0
    for var in "$@"
    do
      grep "$var" log.txt &>/dev/null || let rc=1
    done
		COUNTER=$(expr $COUNTER + 1)
	done
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Checking the commit readiness of the chaincode definition successful on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' ===================== "
  else
    echo "!!!!!!!!!!!!!!! After $MAX_RETRY attempts, Check commit readiness result on peer0.hopsital${HOSPITAL} is INVALID !!!!!!!!!!!!!!!!"
    echo
    exit 1
  fi
}

# commitChaincodeDefinition VERSION PEER HOSPITAL (PEER HOSPITAL)...
commitChaincodeDefinition() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and hopsital parameters "

  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  # peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name hospitalcontract $PEER_CONN_PARMS --version ${VERSION} --sequence ${VERSION} --init-required >&log.txt 
  peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls  $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA --channelID $CHANNEL_NAME --name hospitalcontract $PEER_CONN_PARMS --version ${VERSION} --sequence ${VERSION} >&log.txt
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Chaincode definition commit failed on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' failed"
  echo "===================== Chaincode definition committed on channel '$CHANNEL_NAME' ===================== "
  echo
}

# queryCommitted HOSPITAL
queryCommitted() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  EXPECTED_RESULT="Version: ${VERSION}, Sequence: ${VERSION}, Endorsement Plugin: escc, Validation Plugin: vscc"
  echo "===================== Querying chaincode definition on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME'... ===================== "
	local rc=1
	local COUNTER=1

  if [ -z "$3" ]; then
  MAX_RETRY="5" 
  else
  MAX_RETRY="$3"
  fi

	# continue to poll
  # we either get a successful response, or reach MAX RETRY
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    echo "Attempting to Query committed status on peer0.hopsital${HOSPITAL}, Retry after $DELAY seconds."
    set -x
    peer lifecycle chaincode querycommitted --channelID $CHANNEL_NAME --name hospitalcontract >&log.txt
    res=$?
    set +x
		test $res -eq 0 && VALUE=$(cat log.txt | grep -o '^Version: [0-9], Sequence: [0-9], Endorsement Plugin: escc, Validation Plugin: vscc')
    test "$VALUE" = "$EXPECTED_RESULT" && let rc=0
		COUNTER=$(expr $COUNTER + 1)
	done
  echo
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Query chaincode definition successful on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' ===================== "
		echo
  else
    echo "!!!!!!!!!!!!!!! After $MAX_RETRY attempts, Query chaincode definition result on peer0.hopsital${HOSPITAL} is INVALID !!!!!!!!!!!!!!!!"
    echo
    if [ "$2" != "validatingQueryCommit" ]; then
      exit 1
    else 
      return 1
    fi
  fi
}

chaincodeInvokeInit() {
  parsePeerConnectionParameters $@
  res=$?
  verifyResult $res "Invoke transaction failed on channel '$CHANNEL_NAME' due to uneven number of peer and hopsital parameters "

  # while 'peer chaincode' command can get the orderer endpoint from the
  # peer (if join was successful), let's supply it directly as we know
  # it using the "-o" option
  set -x
  peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n hospitalcontract $PEER_CONN_PARMS  >&log.txt
  # --isInit -c '{"function":"InitPatientLedger","Args":[]}'
  res=$?
  set +x
  cat log.txt
  verifyResult $res "Invoke execution on $PEERS failed "
  echo "===================== Invoke transaction successful on $PEERS on channel '$CHANNEL_NAME' ===================== "
  echo
}

chaincodeQuery() {
  HOSPITAL=$1
  setGlobals $HOSPITAL
  echo "===================== Querying on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME'... ===================== "
	local rc=1
	local COUNTER=1
	# continue to poll
  # we either get a successful response, or reach MAX RETRY
	while [ $rc -ne 0 -a $COUNTER -lt $MAX_RETRY ] ; do
    sleep $DELAY
    echo "Attempting to Query peer0.hopsital${HOSPITAL} ...$(($(date +%s) - starttime)) secs"
    set -x
    peer chaincode query -C $CHANNEL_NAME -n hospitalcontract -c '{"Args":["readPatient","PID0"]}' >&log.txt
    res=$?
    set +x
		let rc=$res
		COUNTER=$(expr $COUNTER + 1)
	done
  echo
  cat log.txt
  if test $rc -eq 0; then
    echo "===================== Query successful on peer0.hopsital${HOSPITAL} on channel '$CHANNEL_NAME' ===================== "
		echo
  else
    echo "!!!!!!!!!!!!!!! After $MAX_RETRY attempts, Query result on peer0.hopsital${HOSPITAL} is INVALID !!!!!!!!!!!!!!!!"
    echo
    exit 1
  fi
}

# at first we package the chaincode
packageChaincode 1


echo $ORDERER_CA $PEER0_ORG1_CA
# sleep 3
# Install chaincode on peer0.hospital1 and peer0.hospital2
echo "Installing chaincode on peer0.hospital1..."
installChaincode 1

# sleep 5
echo "Install chaincode on peer0.hospital2..."
installChaincode 2

# queryCommitted 1 "validatingQueryCommit" 2

# if [ $? -eq 0 ]; then
#     echo "Chaincode is already Committed.."
#     exit 0
# fi


## query whether the chaincode is installed
queryInstalled 1

## approve the definition for hospital1
approveForMyOrg 1

## check whether the chaincode definition is ready to be committed
## expect hospital1 to have approved and hospital2 not to
checkCommitReadiness 1 "\"Hospital1MSP\": true" "\"Hospital2MSP\": false"
checkCommitReadiness 2 "\"Hospital1MSP\": true" "\"Hospital2MSP\": false"

## query whether the chaincode is installed
queryInstalled 2

## now approve also for hospital2
approveForMyOrg 2

## check whether the chaincode definition is ready to be committed
## expect them both to have approved
checkCommitReadiness 1 "\"Hospital1MSP\": true" "\"Hospital2MSP\": true"
checkCommitReadiness 2 "\"Hospital1MSP\": true" "\"Hospital2MSP\": true"

## now that we know for sure both orgs have approved, commit the definition
commitChaincodeDefinition 1 2

## query on both orgs to see that the definition committed successfully
queryCommitted 1
queryCommitted 2

## Invoke the chaincode
# chaincodeInvokeInit 1 2

# sleep 10

# Query chaincode on peer0.hospital1
# echo "Querying chaincode on peer0.hospital1..."
# chaincodeQuery 1

# Query chaincode on peer0.hospital2
# echo "Querying chaincode on peer0.hospital2..."
# chaincodeQuery 2

exit 0

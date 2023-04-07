SLEEP_TIME=5

function setEnvPeer() {

    pushd ./scripts
    . ./runPeer.sh $1
    popd

}

function createHospitalNetwork(){
    ./network.sh down
    sleep $SLEEP_TIME
    ./network.sh up -ca -s couchdb
    sleep $SLEEP_TIME
}

function validateChainCodeInstalledOnPeers() {
  echo "Validation on Hospital1-Peer0"
  setEnvPeer 1
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 

  echo "Validation on Hospital2-Peer0"
  setEnvPeer 2
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 
}

chaincodeQuery() {
  HOSPITAL=$1
  CHANNEL_NAME="hospital-channel"
  MAX_RETRY=5
  DELAY=3

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

function ValidateChaincodeonPeers() {

  # import utils
  . scripts/envVar.sh

  echo "Validation on Hospital1-Peer0"
  setEnvPeer 1
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 
  chaincodeQuery 1

  echo "Validation on Hospital2-Peer0"
  setEnvPeer 2
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 
  chaincodeQuery 2

}

function createHospitalNetwork_DeployChaincode(){
  echo "Removing Old Wallets"
  rm -rf ../hospital-sdk/fabric-network/wallet/*

  echo "Creating Hospital Network"
  createHospitalNetwork
  setEnvPeer 1
  peer channel list
  sleep $SLEEP_TIME
  sleep $SLEEP_TIME
   echo "Creating Hospital Channel"
  ./network.sh createChannel -c hospital-channel
  setEnvPeer 1
  peer channel list
  echo "Sleeping For Few Seconds for Network Up"
  sleep $SLEEP_TIME
  sleep $SLEEP_TIME
  sleep $SLEEP_TIME
  echo "Deploying Hospital Contract on Hospital Channel"
  ./network.sh deployCC

  validateChainCodeInstalledOnPeers

  echo "Please Check the log for any errors."

  echo "run ./hospitalNetwork.sh validate --> To validate the chaincode is installed successfully on both the peers" 

}

function addHospital3() {
  echo "Adding Hospital3 To the Hospital Network"
  pushd ./addHospital3
  ./addHospital3.sh up -ca -c hospital-channel -s couchdb
  popd
  sleep $SLEEP_TIME
  setEnvPeer 3
  peer channel list
  echo "Deploying Chaincode on Hospital3 Peer"
  ./scripts/deployCCHosp3.sh hospital-channel
  sleep $SLEEP_TIME
  peer lifecycle chaincode queryinstalled

  echo "Validation on Hospital3-Peer0"
  setEnvPeer 3
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 
  chaincodeQuery 3

}

if [ $1 == "up" ]; then
  createHospitalNetwork_DeployChaincode
elif [ $1 == "peer" ]; then
  setEnvPeer $2
  peer channel list
  peer lifecycle chaincode queryinstalled
elif [ $1 == "addHosp3" ]; then
  addHospital3
elif [ $1 == "validate" ]; then
  ValidateChaincodeonPeers
elif [ $1 == "validateChaincode" ]; then
  ./scripts/custom/validateAllFunctionsOnChaincode.sh
elif [ $1 == "down" ]; then
  ./network.sh down
else
  printHelp
  exit 1
fi






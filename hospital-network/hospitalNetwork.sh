SLEEP_TIME=5
MONGO_COMPOSE_FILE="-f ./docker/docker-compose-mongodb.yaml"
IMAGETAG="latest"
COMPOSE_FILE_CLIEN_SDK="-f ./docker/docker-compose-client-sdk.yaml"

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
  # chaincodeQuery 1

  echo "Validation on Hospital2-Peer0"
  setEnvPeer 2
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 
  # chaincodeQuery 2

}

function startClientSDKContainers() {
  echo "Starting Client-SDK Containers.."

  IMAGE_TAG=$IMAGETAG docker-compose ${COMPOSE_FILE_CLIEN_SDK} up -d 2>&1

  docker ps -a
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Unable to start the Client-SDK container"
    exit 1
  fi

}

function removeClientSDKContainers() {
  echo "Removing Client-SDK Containers.."

  IMAGE_TAG=$IMAGETAG docker-compose ${COMPOSE_FILE_CLIEN_SDK} down --volumes --remove-orphans 2>&1

  docker ps -a
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Unable to remove the Client-SDK container"
    exit 1
  fi

}

function startMongodbContainer() {
  
  echo "Starting Mongodb Container for storing user credentials"

  docker-compose ${MONGO_COMPOSE_FILE} up -d 2>&1

  docker ps -a
  if [ $? -ne 0 ]; then
    echo "ERROR !!!! Unable to start the mongodb container"
    exit 1
  fi
}

function removeMongodbContainer() {
  if [ "$1" == "volumes" ]; then
   docker-compose ${MONGO_COMPOSE_FILE} down --volumes --remove-orphans 2>&1
  else 
   docker-compose ${MONGO_COMPOSE_FILE} down --remove-orphans 2>&1
  fi
}

function createHospitalNetwork_DeployChaincode(){
  
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

  # starting the mongodb container
  startMongodbContainer

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
  # chaincodeQuery 3

}

if [ $1 == "up" ]; then
  createHospitalNetwork_DeployChaincode
elif [ $1 == "peer" ]; then
  setEnvPeer $2
  peer channel list
  peer lifecycle chaincode queryinstalled
elif [ $1 == "addHosp3" ]; then
  addHospital3
elif [ $1 == "deploy" ]; then
 ./network.sh deployCC
elif [ $1 == "validate" ]; then
  ValidateChaincodeonPeers
elif [ $1 == "quickstart" ]; then
  createHospitalNetwork_DeployChaincode
  startClientSDKContainers
  echo "Visit http://localhost:3000/ to see the hospital-client web app"
elif [ $1 == "shutdown" ]; then
  echo "Removing Old Wallets"
  rm -rf ../hospital-sdk/fabric-network/wallet/*
  ./network.sh down
  removeMongodbContainer volumes
  removeClientSDKContainers
elif [ $1 == "down" ]; then
  echo "Removing Old Wallets"
  rm -rf ../hospital-sdk/fabric-network/wallet/*
  ./network.sh down
  removeMongodbContainer volumes
elif [ $1 == "pause" ]; then
  ./network.sh pause
  removeMongodbContainer
elif [ $1 == "start" ]; then
  ./network.sh start
  startMongodbContainer
else
  printHelp
  exit 1
fi






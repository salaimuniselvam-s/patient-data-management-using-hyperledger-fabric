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

function createHospitalNetwork_DeployChaincode(){

  createHospitalNetwork
  setEnvPeer 1
  peer channel list
  ./network.sh createChannel -c hospital-channel
  setEnvPeer 1
  peer channel list
  ./network.sh deployCC
  setEnvPeer 1
  peer channel getinfo -c hospital-channel
  peer lifecycle chaincode queryinstalled 

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

}

if [ $1 == "up" ]; then
  ./network.sh down
  createHospitalNetwork_DeployChaincode
elif [ $1 == "peer" ]; then
  setEnvPeer $2
  peer channel list
  peer lifecycle chaincode queryinstalled
elif [ $1 == "hosp3" ]; then
  addHospital3
elif [ $1 == "down" ]; then
  ./network.sh down
else
  printHelp
  exit 1
fi






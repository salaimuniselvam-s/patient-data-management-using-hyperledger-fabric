# Joins the Regular peer to hospital channel
export FABRIC_CFG_PATH=$PWD
function usage {
    echo ". join-regualr-peer-to-hospitalchannel.sh   ORG_NAME   PEER_NAME  [PORT_NUMBER_BASE default=7050] [ORDERER_ADDRESS default=loclahost:7050"
    echo "               Make sure peer is started cleanly"
}

if [ -z $1 ];
then
    usage
    echo "Please provide the ORG Name!!!"
    exit 0
else
    ORG_NAME=$1
    echo "Switching PEER_NAME for Org = $ORG_NAME"
fi

if [ -z $2 ];
then
    usage
    echo  "Please specify PEER_NAME or Peer name!!!"
    exit 0
else
    PEER_NAME=$2
fi

PORT_NUMBER_BASE=7050
if [ -z $3 ]
then
    echo "Setting PORT_NUMBER_BASE=7050"   
else
    PORT_NUMBER_BASE=$3
fi

if [ -z $4 ]
then
    ORDERER_ADDRESS="localhost:7050"
    echo "====>Using default orderer localhost:7050"
else 
    ORDERER_ADDRESS=$4
fi

source set-env.sh  $ORG_NAME  $PEER_NAME  $PORT_NUMBER_BASE
# 1. Fetch the 0th block for hospital channel
peer channel fetch 0 -c hospitalchannel -o $ORDERER_ADDRESS

# Give some time
sleep 5s

#export PEER_LOGGING_LEVEL=debug

# 2. Join the channel
# Only admin is allowed to execute join command
CRYPTO_CONFIG_ROOT_FOLDER=$PWD/../ca/client
export CORE_PEER_MSPCONFIGPATH=$CRYPTO_CONFIG_ROOT_FOLDER/$ORG_NAME/admin/msp
peer channel join -b hospitalchannel_0.block -o $ORDERER_ADDRESS



# Joins the peer to a channel
# ORG_NAME="${PWD##*/}"

HOSPITAL_CHANNEL_BLOCK=./hospitalchannel.block

function usage {
    echo "Usage:     ./join-hospital-channel.sh  ORG_NAME  PEER_NAME  [PORT_NUMBER_BASE default=7050] [ORDERER_ADDRESS default=localhost:7050]"
    echo "           Specified Peer MUST be up for the command to be successful"
}

if [ -z $1 ]
then
    usage
    echo 'Please provide ORG_NAME & PEER_NAME!!!'
    exit 1
else 
    ORG_NAME=$1
fi

if [ -z $2 ]
then
    usage
    echo 'Please provide PEER_NAME!!!'
    exit 1
else 
    PEER_NAME=$2
fi


if [ -z $3 ]
then
    PORT_NUMBER_BASE=7050
    echo "====>Using Port Number Base :7050"
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

# Set the environment vars
# source set-env.sh $ORG_NAME  $PEER_NAME  $PORT_NUMBER_BASE

./show-env.sh

# Only admin is allowed to execute join command
export CORE_PEER_MSPCONFIGPATH=../ca/client/$ORG_NAME/admin/msp
echo $CORE_PEER_MSPCONFIGPATH
# Fetch hospital channel configuration
# peer channel fetch config $HOSPITAL_CHANNEL_BLOCK -o $ORDERER_ADDRESS -c hospitalchannel
peer channel fetch 0 $HOSPITAL_CHANNEL_BLOCK -o $ORDERER_ADDRESS -c hospitalchannel

# Join the channel
peer channel join -o $ORDERER_ADDRESS -b $HOSPITAL_CHANNEL_BLOCK

# Execute the anchor peer update

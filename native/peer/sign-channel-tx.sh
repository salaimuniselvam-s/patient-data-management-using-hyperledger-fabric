# Sign the airline channel tx file hopsital admins
# E.g.,   ./sign-channel-tx.sh   hospital1  Signs the file with hospital1 admin certificate/key
# E.g.,   ./sign-channel-tx.sh   hospital2     Signs the file with hospital2 admin certificate/key
function usage {
    echo "./sign-channel-tx.sh   ORG_NAME"
    echo "               Signs the channel transaction file with identity of admin from ORG_ADMIN"
    echo "               PLEASE NOTE:  Signs the tx file under  orderer/hospital-channel.tx "
}

if [ -z $1 ]
then
    usage
    echo 'Please provide ORG_NAME!!!'
    exit 1
else 
    ORG_NAME=$1
fi

# Set the environment variable $1 = ORG_NAME Identity=admin
source set-identity.sh 


# Variable holds path to the channel tx file
CHANNEL_TX_FILE=$PWD/../orderer/hospital-channel.tx

# Execute command to sign the tx file in place
peer channel signconfigtx -f $CHANNEL_TX_FILE

echo "====> Done. Signed file with identity $ORG_NAME/admin"
echo "====> Check size & timestamp of file $CHANNEL_TX_FILE"

# PS: The join cannot be execute without a channel created
# peer channel join -o localhost:7050 -b $PWD/../../orderer/multi-hopsital-ca/airline-channel.tx
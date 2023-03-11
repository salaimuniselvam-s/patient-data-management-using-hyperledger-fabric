#!/bin/bash
# Test case #1 for validating the setup
# Requires the acme peer1 to be up & running
#
# Validates the working of : Acme Peer1
#
# 1. Checks if the chaincode is already committed
#    If NOT then
#       * Package the chaincode
#       * Installs the chaincode on peer1
#       * Approve & Commit the chaincode
#       * Initialize the chaincode
#    Fi
# 2. Query chaincode for balance of A
# 3. Invoke the transfer of 10 from A to B
# 4. Query chaincode for balance of A

# Change this only if you get errors
export FABRIC_LOGGING_SPEC=ERROR

source  set-env.sh  acme peer1 7050 admin

ORDERER_ADDRESS="localhost:7050"

CC_CONSTRUCTOR='{"Args":["init","a","100","b","200"]}'

# Change the name to re install the chaincode
CC_NAME="gocc6"
CC_PATH="chaincode_example02"

# Script does not support upgrade
CC_VERSION="1.0"
CC_CHANNEL_ID="airlinechannel"
CC_LANGUAGE="golang"

# Introduced in Fabric 2.x
INTERNAL_DEV_VERSION="1.0"
CC2_PACKAGE_FOLDER="$HOME/packages"
CC2_SEQUENCE=1
CC2_INIT_REQUIRED="--init-required"

ORG_NAME="acme"
IDENTITY="admin"

# 2. Create the package
PACKAGE_NAME="$CC_NAME.$CC_VERSION-$INTERNAL_DEV_VERSION.tar.gz"

# Extracts the package ID for the installed chaincode
LABEL="$CC_NAME.$CC_VERSION-$INTERNAL_DEV_VERSION"
function cc_get_package_id {  
    OUTPUT=$(peer lifecycle chaincode queryinstalled -O json)
    PACKAGE_ID=$(echo $OUTPUT | jq -r ".installed_chaincodes[]|select(.label==\"$LABEL\")|.package_id")
}

# 1. Set the identity context
# ORG_NAME=acme
# IDENTITY=admin
# source  set-identity.sh  $ORG_NAME  $IDENTITY

# This is to check if the chaincode is already committed
echo "Checking if chaincode already committed : $CC_NAME"
CHECK_IF_COMMITTED=$(peer lifecycle chaincode querycommitted -C $CC_CHANNEL_ID -n $CC_NAME)
if [ $? == "0" ]; then
    echo "Chaicode Already Committed - Will invoke & query."
else
    

    # Check if package already exist
    if [ -f "$CC2_PACKAGE_FOLDER/$PACKAGE_NAME" ]; then
        echo "====> Step 1 Using the existing chaincode package:   $CC2_PACKAGE_FOLDER/$PACKAGE_NAME"
    else
        echo "====> Step 1 Creating the chaincode package $CC2_PACKAGE_FOLDER/$PACKAGE_NAME"
        peer lifecycle chaincode package $CC2_PACKAGE_FOLDER/$PACKAGE_NAME -p $CC_PATH \
                    --label="$CC_NAME.$CC_VERSION-$INTERNAL_DEV_VERSION" -l $CC_LANGUAGE
    fi


    # 2. Install the chaincode
    echo "====> Step 2   Installing chaincode (may fail if CC/version already there)"
    peer lifecycle chaincode install  $CC2_PACKAGE_FOLDER/$PACKAGE_NAME

    # Set the package ID -  PACAKGE_ID will be set
    cc_get_package_id

    # 3. Approve for my org
    echo "====> Step 3   Approving the chaincode"
    peer lifecycle chaincode approveformyorg --channelID $CC_CHANNEL_ID  --name $CC_NAME \
            --version $CC_VERSION --package-id $PACKAGE_ID --sequence $CC2_SEQUENCE \
            $CC2_INIT_REQUIRED    -o $ORDERER_ADDRESS  --waitForEvent

    # This is to confirm the approval         
    peer lifecycle chaincode checkcommitreadiness -C $CC_CHANNEL_ID -n \
        $CC_NAME --sequence $CC2_SEQUENCE -v $CC_VERSION  $CC2_INIT_REQUIRED 

    # 4. Commit the chaincode
    echo "====> Step 4   Committing the chaincode"
    peer lifecycle chaincode commit -C $CC_CHANNEL_ID -n $CC_NAME -v $CC_VERSION \
            --sequence $CC2_SEQUENCE  $CC2_INIT_REQUIRED    --waitForEvent
    # this is to check commited chaincode
    peer lifecycle chaincode querycommitted -C $CC_CHANNEL_ID -n $CC_NAME 

    # 5. Init the chaincode
    echo "====> Step 5     Setting A=100  B=100  (will fail if already initialized)"


    peer chaincode invoke  -C $CC_CHANNEL_ID -n $CC_NAME -c $CC_CONSTRUCTOR \
        --waitForEvent --isInit -o $ORDERER_ADDRESS 
fi


# 6. Execute Query
echo "====> Step 6     Querying A on Acme peer1"
peer chaincode query -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["query","a"]}'


# 5. Invoke Query
echo "====> Step 7     Transferring 10 from A to B"
peer chaincode invoke -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["invoke","a","b","10"]}' --waitForEvent


# 6. Execute Query
echo "====> Step 8     Querying A on Acme peer1"
peer chaincode query -C $CC_CHANNEL_ID -n $CC_NAME  -c '{"Args":["query","a"]}'

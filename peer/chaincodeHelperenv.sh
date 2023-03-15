export CC_CONSTRUCTOR='{"function":"InitLedger","Args":[]}'

# Change the name to re install the chaincode
export CC_NAME="hosp-cc"
export CC_PATH="../chaincode/sample"

# Script does not support upgrade
export CC_VERSION="1.0"
export CC_CHANNEL_ID="hospitalchannel"
export CC_LANGUAGE="node"

# Introduced in Fabric 2.x
export INTERNAL_DEV_VERSION="1.0"
export CC2_PACKAGE_FOLDER="./packages"
export CC2_SEQUENCE=1
export CC2_INIT_REQUIRED="--init-required"

export ORG_NAME="hospital1"
export IDENTITY="admin"
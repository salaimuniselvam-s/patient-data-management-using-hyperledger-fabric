# Launches the Orderer


# You may override this *but* make sure you adjust the clean.sh accordingly
export PATH=${PWD}/../bin:$PATH
export ORDERER_FILELEDGER_LOCATION=./ledgers
# Change this to control logs verbosity
export FABRIC_LOGGING_SPEC=INFO

#### You may add other vars to override setup in orderer.yaml###
export FABRIC_CFG_PATH=$PWD

# Launch orderer
orderer
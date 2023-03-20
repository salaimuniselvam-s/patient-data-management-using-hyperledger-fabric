# Initialize the orderer
# 1. Clean up
# 2. IF $1=all then Copies the YAML files to the current folder 
#       Copies the ../config/orderer/configtx.yaml 
#       Copies the ../config/orderer/orderer.yaml 
# 3. Generates the Genesis block
# 4. Generates the create channel tx file 
#


#1.
./clean.sh all
mkdir -p ledgers
mkdir -p production

BASE_CONFIG_DIR=../configs/orderer
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD

# Change this to see log meesage details
export ORDERER_GENERAL_LOGLEVEL=debug

#2 Copy the YAML files
if [ ! -z $1 ]; then
    if [ $1 == "all" ]; then

        cp $BASE_CONFIG_DIR/configtx.yaml .
        cp $BASE_CONFIG_DIR/orderer.yaml .
        echo    'Copied:  configtx & orderer YAML files.'
        
    fi
else
    echo 'Use ./init.sh   all      to initialize configtx and orderer YAML'
fi




#3. Setup the genesis block
echo    '================ Writing genesis ================'
# configtxgen -profile AcmeOrdererGenesis -outputBlock ./acme-genesis.block -channelID ordererchannel
configtxgen -profile HospitalOrdererGenesis -outputBlock ./hospital-genesis.block -channelID ordererchannel


#channel name contains illegal charcter error -> means channelID should be in smallcase

#4. Create the HospitalChannel transaction
echo    '================ Writing HospitalChannel ================'
# configtxgen -profile AcmeChannel -outputCreateChannelTx ./acme-channel.tx -channelID acmechannel
configtxgen -profile HospitalChannel -outputCreateChannelTx ./hospital-channel.tx -channelID hospitalchannel

# Generates the orderer | generate the airline channel transaction

# export ORDERER_GENERAL_LOGLEVEL=debug
export FABRIC_LOGGING_SPEC=INFO
export FABRIC_CFG_PATH=$PWD

function usage {
    echo "./generate-channel-tx.sh "
    echo "     Creates the airline-channel.tx for the channel airlinechannel"
}

echo    '================ Writing Hospitalchannel ================'

configtxgen -profile HospitalChannel -outputCreateChannelTx ./hospital-channel.tx -channelID hospitalchannel



echo    '======= Done. Launch by executing orderer ======'

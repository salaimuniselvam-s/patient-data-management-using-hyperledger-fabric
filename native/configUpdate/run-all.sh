# $1 -> Application channel
# $2 -> Orderer Channel

echo "Delete the old configs"
./clean.sh 

echo "Fetching the configs from the $1"
./fetch-config-json.sh $1

echo "Modifying the Updates from the $1"
./generate-config-update.sh $2

./sign-config-update.sh hospital1 

./submit-config-update-tx.sh hospital1 admin orderechannel
# Generates the genesis & airline channel

./clean.sh all
echo "====>Cleaned"

./init.sh all

./register-enroll-orderer.sh

# ./generate-genesis.sh
# echo "====>Generated Genesis"

# ./generate-channel-tx.sh
# echo "====>Generated Channel Transacton"

./launch.sh

# Sets up the initail set of identities
./clean.sh

# 1. Start the CA Server
./server.sh start
echo "====> 1. Starting server "
# 2. Sleep for 3 seconds - give time for server to start up
#    Increase this if needed
SLEEP_TIME=3s
echo "====> 2. Sleeping for $SLEEP_TIME "
sleep $SLEEP_TIME

# 3. Enroll the 
./server.sh enroll
echo "====> 3. Enrolled Bootstrap Identity"

# 4. Enroll Org admin
./register-enroll-admins.sh
echo "====> 4. Enrolled Admin Identities  (Orderer, hospital1, hospital2)"
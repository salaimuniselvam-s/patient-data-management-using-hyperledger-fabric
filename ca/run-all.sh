# Sets up the initail set of identities
./clean.sh
SLEEP_TIME=4

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

#Add users under organization 
# 1. Register the user using the respective organization admin
# 2. Enroll the user and copy the admincerts
# 
# . ./setclient.sh hospital1 admin

./register-enroll-users.sh hospital1 peer1 hospital1.outpatient

echo "====> Registered Peer1 Under Hospital1"

echo "Sleeping for $SLEEP_TIME seconds"
sleep $SLEEP_TIME

./register-enroll-users.sh hospital2 peer2 hospital2.surgery

echo "====> Registered Peer2 Under Hospital2"

# Things to Remember
# Identity names needs to be unique even across organizations ( still not unsure maybe its because the identity name has to be unique to the fabric ca server)
# affliations needs to be in the fabric ca server config.

echo "====> Setting Msp's for the organizations"

./setup-org-msp.sh hospital1

./setup-org-msp.sh hospital2

./setup-org-msp.sh orderer



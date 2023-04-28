# source ./scripts/envVar.sh

# CHANNEL_NAME=hospital-channel

# BASE_QUERY="peer chaincode query -C $CHANNEL_NAME -n hospitalcontract -c"

# BASE_INVOKE_HOSP1="peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.geakminds.com --tls 
# $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA -C $CHANNEL_NAME -n hospitalcontract $PEER_CONN_PARMS -c "

# function validateGetAllPatientRecords() {
#   echo "Getting All Patient Records"

#   setGlobals 1
#   $BASE_QUERY '{"Args":["GetAllPatientRecords"]}' 
#   echo -e "\n"

#   setGlobals 2
#   $BASE_QUERY '{"Args":["GetAllPatientRecords"]}' 
#   echo -e "\n"
# }

# function createNewPatientRecord(){

#   setGlobals 1

#   echo  -e "Create a New Patient Record Patient Records"
#   # chaincodeConstants=$(node ./scripts/custom/chaincodeConstants.js)
#   # patientDetails=$(echo "$chaincodeConstants" | awk -F'= ' '/newPatientRecord/ {print $2}')
#   # echo $patientDetails $chaincodeConstants

#   $BASE_INVOKE_HOSP1 '{"Args":["CreatePatientRecord","{\"patientId\":\"Patient5\",\"address\":\"123,ENS,Srivi\",\"telephone\":234567,\"diagnosis\":\"Sugar\",\"medication\":\"Tablet\",\"doctorId\":\"F\",\"bloodgroup\":\"A1\"}"]}'
#   # echo -e "\n"

#    $BASE_INVOKE_HOSP1 '{"Args":["UpdatePatientInfo","{\"patientId\":\"Patient3\",\"address\":\"123,ENS,Srivi\",\"telephone\":234,\"diagnosis\":\"Sugar\",\"medication\":\"Tablet\",\"doctorId\":\"F\",\"bloodgroup\":\"A1\"}"]}'
#   echo -e "\n"

# }

# createNewPatientRecord

# validateGetAllPatientRecords


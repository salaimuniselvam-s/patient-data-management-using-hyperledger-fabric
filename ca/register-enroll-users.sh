#!/bin/bash
# Registers the Users 
SLEEP_TIME=4

function registerUsers {
    # 1. Set the Organization Admin as FABRIC_CA_CLIENT_HOME
    source setclient.sh   $1   admin

    # 2. Register  users
    echo "Registering: $2 under $1 organization"
    ATTRIBUTES='"hf.Registrar.Roles=peer,user,client","hf.AffiliationMgr=true","hf.Revoker=true"'
    fabric-ca-client register --id.type client --id.name $2 --id.secret pw --id.affiliation $3 
    # --id.attrs $ATTRIBUTES
    # fabric-ca-client register --id.type client --id.name peer1 --id.secret pw --id.affiliation hospital1.user

}

# Setup MSP
function setupMSP {
    mkdir -p $FABRIC_CA_CLIENT_HOME/msp/admincerts

    echo "====> $FABRIC_CA_CLIENT_HOME/msp/admincerts"
    cp $FABRIC_CA_CLIENT_HOME/../../$1/admin/msp/signcerts/*  $FABRIC_CA_CLIENT_HOME/msp/admincerts
}

# Enroll Users
function enrollUsers {
    # 1. Enroll
    echo "Enrolling: $2"

    source setclient.sh   $1   $2
    fabric-ca-client enroll -u http://$2:pw@localhost:7054

    # fabric-ca-client enroll -u http://peer85:pw@localhost:7054

    setupMSP $1

   
}



echo "========= Registering ==============="
registerUsers $1 $2 $3

echo "Sleeping for $SLEEP_TIME seconds"
sleep $SLEEP_TIME

echo "========= Enrolling ==============="
enrollUsers $1 $2
echo "==================================="
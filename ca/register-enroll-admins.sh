#!/bin/bash
# Registers the 3 admins
# hospital1-admin, hospital2-admin, orderer-admin

# Registers the admins
function registerAdmins {
    # 1. Set the CA Server Admin as FABRIC_CA_CLIENT_HOME
    source setclient.sh   caserver   admin

    # 2. Register hospital1-admin
    echo "Registering: hospital1-admin"
    ATTRIBUTES='"hf.Registrar.Roles=peer,user,client","hf.AffiliationMgr=true","hf.Revoker=true"'
    fabric-ca-client register --id.type client --id.name hospital1-admin --id.secret pw --id.affiliation hospital1 --id.attrs $ATTRIBUTES

    # 3. Register hospital2-admin
    echo "Registering: hospital2-admin"
    ATTRIBUTES='"hf.Registrar.Roles=peer,user,client","hf.AffiliationMgr=true","hf.Revoker=true"'
    fabric-ca-client register --id.type client --id.name hospital2-admin --id.secret pw --id.affiliation hospital2 --id.attrs $ATTRIBUTES

    # 4. Register orderer-admin
    echo "Registering: orderer-admin"
    ATTRIBUTES='"hf.Registrar.Roles=orderer"'
    fabric-ca-client register --id.type client --id.name orderer-admin --id.secret pw --id.affiliation orderer --id.attrs $ATTRIBUTES
}

# Setup MSP
function setupMSP {
    mkdir -p $FABRIC_CA_CLIENT_HOME/msp/admincerts

    echo "====> $FABRIC_CA_CLIENT_HOME/msp/admincerts"
    cp $FABRIC_CA_CLIENT_HOME/../../caserver/admin/msp/signcerts/*  $FABRIC_CA_CLIENT_HOME/msp/admincerts
}

# Enroll admin
function enrollAdmins {
    # 1. hospital1-admin
    echo "Enrolling: hospital1-admin"

    ORG_NAME="hospital1"
    source setclient.sh   $ORG_NAME   admin
    checkCopyYAML
    fabric-ca-client enroll -u http://hospital1-admin:pw@localhost:7054

    setupMSP

    # 2. hospital2-admin
    echo "Enrolling: hospital2-admin"

    ORG_NAME="hospital2"
    source setclient.sh   $ORG_NAME   admin
    checkCopyYAML
    fabric-ca-client enroll -u http://hospital2-admin:pw@localhost:7054

    setupMSP

    # 3. orderer-admin
    echo "Enrolling: orderer-admin"

    ORG_NAME="orderer"
    source setclient.sh   $ORG_NAME   admin
    checkCopyYAML
    fabric-ca-client enroll -u http://orderer-admin:pw@localhost:7054

    setupMSP
}

# If client YAML not found then copy the client YAML before enrolling
# YAML picked from ../configs/ca/ORG-Name/*
function    checkCopyYAML {
    SETUP_CONFIG_CLIENT_YAML="../configs/ca"
    if [ -f "$FABRIC_CA_CLIENT_HOME/fabric-ca-client.yaml" ]
    then 
        echo "Using the existing Client Yaml for $ORG_NAME  admin"
    else
        echo "Copied the Client Yaml from $SETUP_CONFIG_CLIENT_YAML/$ORG_NAME "
        mkdir -p $FABRIC_CA_CLIENT_HOME
        cp  "$SETUP_CONFIG_CLIENT_YAML/$ORG_NAME/fabric-ca-client-config.yaml" "$FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml"
    fi
}

echo "========= Registering ==============="
registerAdmins
echo "========= Enrolling ==============="
enrollAdmins
echo "==================================="
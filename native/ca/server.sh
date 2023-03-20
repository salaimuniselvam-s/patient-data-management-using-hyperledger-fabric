#!/bin/bash
# Utility for
# 1. Initializing the CA server     a) copy the server YAML to ./server b) server.sh  start
#    Validate by checking the logs under ./server/server.log
#    To use different config - replace the ./server/fabric-ca-server-config.yaml
# 2. Starting the CA Server         a) server.sh  start
# 3. Stopping the CA Server
# 4. Enrolling the Root CA Server admin

export FABRIC_CA_SERVER_HOME=$PWD/server
DEFAULT_SERVER_CONFIG_YAML="../configs/ca/rootCa/fabric-ca-server-config.yaml"
DEFAULT_CLIENT_CONFIG_YAML="../configs/ca/rootCa/fabric-ca-client-config.yaml"

# Used in go command - sleeps between start & enroll
SLEEP_TIME=4

function usage {
    echo    "No action taken. Please provide argument"
    echo    "Usage:    ./server.sh   start |  stop  | enroll | enable-removal"
    echo    "                                         enrolls the admin identity for the server"
    echo    "                                         enable-remove Restarts server with removal enabled"
}

# Enroll the bootstrap admin identity for the server
function enroll {
    
    export FABRIC_CA_CLIENT_HOME=$PWD/client/caserver/admin

    if [ -f "$FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml" ]
    then
        echo "Using client YAML:  $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml"
    else
        mkdir -p $FABRIC_CA_CLIENT_HOME
        echo "Client YAML not found in $FABRIC_CA_CLIENT_HOME"
        echo "Copying the $DEFAULT_CLIENT_CONFIG_YAML to $FABRIC_CA_CLIENT_HOME!!!"
        cp $DEFAULT_CLIENT_CONFIG_YAML  "$FABRIC_CA_CLIENT_HOME/"
    fi
    set -x
    fabric-ca-client enroll -u http://geakminds:geakminds@123@localhost:7054 --caname geakminds-ca --tls.certfiles ${PWD}/server/tls-cert.pem
    set +x
}

# Starts the CA server
function start {

    # Check the ./server for SERVER Yaml file
    # If its not there copy the Server Config YAML from $DEFAULT_SERVER_CONFIG_YAML
    if [ -f "./server/fabric-ca-server-config.yaml" ]
    then   
        echo "Using the ./server/fabric-ca-server-config.yaml"
    else
	    echo "Server YAML not found in ./server"
        echo "Copying the $DEFAULT_SERVER_CONFIG_YAML to ./server!!!"
        cp $DEFAULT_SERVER_CONFIG_YAML  ./server
    fi

    # Uses the ./server/fabric-ca-server-config.yaml
    fabric-ca-server start 2> $FABRIC_CA_SERVER_HOME/server.log &
    echo "Server Started ... Logs available at $FABRIC_CA_SERVER_HOME/server.log"
}

function enable-removal {
    if [ -f "./server/fabric-ca-server.db" ]
    then   
        # DB file not there - so just kill & start 
        killall fabric-ca-server 2> /dev/null
        fabric-ca-server start --cfg.identities.allowremove 2> $FABRIC_CA_SERVER_HOME/server.log &
        echo "Started CA Server with identity removal ENABLED."
    else
	    echo "Error: Please start server before using enable-remove!!!"
        exit 0
    fi
}

if [ -z $1 ];
then
    usage;
    exit 1
fi

case $1 in

    "start")
        # Kill CA server process if it is already running
        killall fabric-ca-server 2> /dev/null
        start
        ;;
    "stop")
        killall fabric-ca-server 2> /dev/null
        echo "Server stopped ... Logs available at = $FABRIC_CA_SERVER_HOME/server.log"
        ;;
    "enroll")
        enroll
        ;;
    "enable-removal")
        enable-removal
        ;;
    "go")
        start
        echo "Sleeping for $SLEEP_TIME seconds"
        sleep $SLEEP_TIME
        enroll
        ;;
    *) echo "Invalid argument !!!"
       usage
       ;;
esac



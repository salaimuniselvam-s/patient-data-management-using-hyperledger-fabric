#!/bin/bash
#Utility script that carries out the following:
# 1. Launches it in background
# 2. Packages the chaincode 
# 3. Installs the chaincode
WAIT_TIME=1s

export CC_NAME=gocc
export CC_VERSION=1.0
export CC_LABEL="$CC_NAME.$CC_VERSION-1.0"
export CC_PACKAGE_FILE=./packages/$CC_LABEL.tar.gz



# Give time to peer to launch
sleep   $WAIT_TIME

# 2. package
peer lifecycle chaincode package  $CC_PACKAGE_FILE -p chaincode_example02 --label $CC_LABEL

# 3. Install
peer lifecycle chaincode install  $CC_PACKAGE_FILE
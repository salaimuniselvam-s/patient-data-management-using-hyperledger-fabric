#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.json 
}

function yaml_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${P1PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

HOSPITAL=1
P0PORT=7051
P1PORT=8051
CAPORT=7054
PEERPEM=crypto-config/peerOrganizations/hospital1.geakminds.com/tlsca/tlsca.hospital1.geakminds.com-cert.pem
CAPEM=crypto-config/peerOrganizations/hospital1.geakminds.com/ca/ca.hospital1.geakminds.com-cert.pem

echo "$(json_ccp $HOSPITAL $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-hospital1.json
echo "$(yaml_ccp $HOSPITAL $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-hospital1.yaml

HOSPITAL=2
P0PORT=9051
P1PORT=10051
CAPORT=8054
PEERPEM=crypto-config/peerOrganizations/hospital2.geakminds.com/tlsca/tlsca.hospital2.geakminds.com-cert.pem
CAPEM=crypto-config/peerOrganizations/hospital2.geakminds.com/ca/ca.hospital2.geakminds.com-cert.pem

echo "$(json_ccp $HOSPITAL $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-hospital2.json
echo "$(yaml_ccp $HOSPITAL $P0PORT $P1PORT $CAPORT $PEERPEM $CAPEM)" > connection-hospital2.yaml

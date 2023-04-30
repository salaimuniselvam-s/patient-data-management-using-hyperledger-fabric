#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.json
}
function json_ccp_docker {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template-docker.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}
function yaml_ccp_docker {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        organizations/ccp-template-docker.yaml | sed -e $'s/\\\\n/\\\n        /g'
}

HOSPITAL=1
P0PORT=7051
CAPORT=7054
PEERPEM=organizations/peerOrganizations/hospital1.geakminds.com/tlsca/tlsca.hospital1.geakminds.com-cert.pem
CAPEM=organizations/peerOrganizations/hospital1.geakminds.com/ca/ca.hospital1.geakminds.com-cert.pem

echo "$(json_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital1.geakminds.com/connection-hospital1.json
echo "$(json_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital1.geakminds.com/connection-hospital1-docker.json
echo "$(yaml_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital1.geakminds.com/connection-hospital1.yaml
echo "$(yaml_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital1.geakminds.com/connection-hospital1-docker.yaml

HOSPITAL=2
P0PORT=9051
CAPORT=8054
PEERPEM=organizations/peerOrganizations/hospital2.geakminds.com/tlsca/tlsca.hospital2.geakminds.com-cert.pem
CAPEM=organizations/peerOrganizations/hospital2.geakminds.com/ca/ca.hospital2.geakminds.com-cert.pem

echo "$(json_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM )" > organizations/peerOrganizations/hospital2.geakminds.com/connection-hospital2.json
echo "$(json_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM )" > organizations/peerOrganizations/hospital2.geakminds.com/connection-hospital2-docker.json
echo "$(yaml_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital2.geakminds.com/connection-hospital2.yaml
echo "$(yaml_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > organizations/peerOrganizations/hospital2.geakminds.com/connection-hospital2-docker.yaml
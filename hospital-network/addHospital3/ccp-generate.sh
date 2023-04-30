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
        ccp-template.json
}
function json_ccp_docker {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template-docker.json
}

function yaml_ccp {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template.yaml | sed -e $'s/\\\\n/\\\n        /g'
}
function yaml_ccp_docker {
    local PP=$(one_line_pem $4)
    local CP=$(one_line_pem $5)
    sed -e "s/\${HOSPITAL}/$1/" \
        -e "s/\${P0PORT}/$2/" \
        -e "s/\${CAPORT}/$3/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ccp-template-docker.yaml | sed -e $'s/\\\\n/\\\n        /g'
}
HOSPITAL=3
P0PORT=11051
CAPORT=11054
PEERPEM=../organizations/peerOrganizations/hospital3.geakminds.com/tlsca/tlsca.hospital3.geakminds.com-cert.pem
CAPEM=../organizations/peerOrganizations/hospital3.geakminds.com/ca/ca.hospital3.geakminds.com-cert.pem

echo "$(json_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/hospital3.geakminds.com/connection-hospital3.json
echo "$(json_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/hospital3.geakminds.com/connection-hospital3-docker.json
echo "$(yaml_ccp $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/hospital3.geakminds.com/connection-hospital3.yaml
echo "$(yaml_ccp_docker $HOSPITAL $P0PORT $CAPORT $PEERPEM $CAPEM)" > ../organizations/peerOrganizations/hospital3.geakminds.com/connection-hospital3-docker.yaml

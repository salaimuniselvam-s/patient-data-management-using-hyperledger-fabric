

function createOrg3 {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp

  set -x
  fabric-ca-client enroll -u https://hosp3admin:hosp3adminpw@localhost:11054 --caname ca-hospital3 --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hospital3.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hospital3.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hospital3.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-11054-ca-hospital3.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/msp/config.yaml

  echo
	echo "Register peer0"
  echo
  set -x
	fabric-ca-client register --caname ca-hospital3 --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  echo
  echo "Register user"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital3 --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  echo
  echo "Register the hopsital admin"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital3 --id.name org3admin --id.secret org3adminpw --id.type admin --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

	mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/peers
  mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com

  echo
  echo "## Generate the peer0 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-hospital3 -M ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/msp --csr.hosts peer0.hospital3.geakminds.com --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/msp/config.yaml ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/msp/config.yaml

  echo
  echo "## Generate the peer0-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:11054 --caname ca-hospital3 -M ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls --enrollment.profile tls --csr.hosts peer0.hospital3.geakminds.com --csr.hosts localhost --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x


  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/ca.crt
  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/signcerts/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/server.crt
  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/keystore/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/server.key

  mkdir ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/msp/tlscacerts
  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/tlsca
  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/tls/tlscacerts/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/tlsca/tlsca.hospital3.geakminds.com-cert.pem

  mkdir ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/ca
  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/peers/peer0.hospital3.geakminds.com/msp/cacerts/* ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/ca/ca.hospital3.geakminds.com-cert.pem

  mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/users
  mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/users/User1@hospital3.geakminds.com

  echo
  echo "## Generate the user msp"
  echo
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:11054 --caname ca-hospital3 -M ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/users/User1@hospital3.geakminds.com/msp --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  mkdir -p ../organizations/peerOrganizations/hospital3.geakminds.com/users/Admin@hospital3.geakminds.com

  echo
  echo "## Generate the hopsital admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://org3admin:org3adminpw@localhost:11054 --caname ca-hospital3 -M ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/users/Admin@hospital3.geakminds.com/msp --tls.certfiles ${PWD}/fabric-ca/hospital3/tls-cert.pem
  set +x

  cp ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/msp/config.yaml ${PWD}/../organizations/peerOrganizations/hospital3.geakminds.com/users/Admin@hospital3.geakminds.com/msp/config.yaml

}

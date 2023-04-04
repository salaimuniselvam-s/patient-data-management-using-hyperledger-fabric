

function createOrg1 {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp
# fabric-ca-client certificate list --caname ca-hospital1 --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set -x
  fabric-ca-client enroll -u https://hosp1admin:hosp1adminpw@localhost:7054 --caname ca-hospital1 --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hospital1.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hospital1.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hospital1.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-7054-ca-hospital1.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/msp/config.yaml

  echo
	echo "Register peer0"
  echo
  set -x
	fabric-ca-client register --caname ca-hospital1 --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  echo
  echo "Register user"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital1 --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  echo
  echo "Register the hopsital admin"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital1 --id.name org1admin --id.secret org1adminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

	mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/peers
  mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com

  echo
  echo "## Generate the peer0 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-hospital1 -M ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/msp --csr.hosts peer0.hospital1.geakminds.com --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/msp/config.yaml

  echo
  echo "## Generate the peer0-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:7054 --caname ca-hospital1 -M ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls --enrollment.profile tls --csr.hosts peer0.hospital1.geakminds.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/tlsca/tlsca.hospital1.geakminds.com-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/ca
  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/peers/peer0.hospital1.geakminds.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/ca/ca.hospital1.geakminds.com-cert.pem

  mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/users
  mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com

  echo
  echo "## Generate the user msp"
  echo
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:7054 --caname ca-hospital1 -M ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/users/User1@hospital1.geakminds.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  mkdir -p organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com

  echo
  echo "## Generate the hopsital admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://org1admin:org1adminpw@localhost:7054 --caname ca-hospital1 -M ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital1/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital1.geakminds.com/users/Admin@hospital1.geakminds.com/msp/config.yaml

}


function createOrg2 {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp

  set -x
  fabric-ca-client enroll -u https://hosp2admin:hosp2adminpw@localhost:8054 --caname ca-hospital2 --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hospital2.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hospital2.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hospital2.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-8054-ca-hospital2.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/msp/config.yaml

  echo
	echo "Register peer0"
  echo
  set -x
	fabric-ca-client register --caname ca-hospital2 --id.name peer0 --id.secret peer0pw --id.type peer --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  echo
  echo "Register user"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital2 --id.name user1 --id.secret user1pw --id.type client --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  echo
  echo "Register the hopsital admin"
  echo
  set -x
  fabric-ca-client register --caname ca-hospital2 --id.name org2admin --id.secret org2adminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

	mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/peers
  mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com

  echo
  echo "## Generate the peer0 msp"
  echo
  set -x
	fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-hospital2 -M ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/msp --csr.hosts peer0.hospital2.geakminds.com --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/msp/config.yaml

  echo
  echo "## Generate the peer0-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://peer0:peer0pw@localhost:8054 --caname ca-hospital2 -M ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls --enrollment.profile tls --csr.hosts peer0.hospital2.geakminds.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x


  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/ca.crt
  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/signcerts/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/server.crt
  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/keystore/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/server.key

  mkdir ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/msp/tlscacerts
  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/msp/tlscacerts/ca.crt

  mkdir ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/tlsca
  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/tlsca/tlsca.hospital2.geakminds.com-cert.pem

  mkdir ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/ca
  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/peers/peer0.hospital2.geakminds.com/msp/cacerts/* ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/ca/ca.hospital2.geakminds.com-cert.pem

  mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/users
  mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com

  echo
  echo "## Generate the user msp"
  echo
  set -x
	fabric-ca-client enroll -u https://user1:user1pw@localhost:8054 --caname ca-hospital2 -M ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/users/User1@hospital2.geakminds.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  mkdir -p organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com

  echo
  echo "## Generate the hopsital admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://org2admin:org2adminpw@localhost:8054 --caname ca-hospital2 -M ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/hospital2/tls-cert.pem
  set +x

  cp ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/msp/config.yaml ${PWD}/organizations/peerOrganizations/hospital2.geakminds.com/users/Admin@hospital2.geakminds.com/msp/config.yaml

}

function createOrderer {

  echo
	echo "Enroll the CA admin"
  echo
	mkdir -p organizations/ordererOrganizations/geakminds.com

	export FABRIC_CA_CLIENT_HOME=${PWD}/organizations/ordererOrganizations/geakminds.com
#  rm -rf $FABRIC_CA_CLIENT_HOME/fabric-ca-client-config.yaml
#  rm -rf $FABRIC_CA_CLIENT_HOME/msp

  set -x
  fabric-ca-client enroll -u https://ordereradmin:ordereradminpw@localhost:9054 --caname ca-orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  echo 'NodeOUs:
  Enable: true
  ClientOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: client
  PeerOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: peer
  AdminOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: admin
  OrdererOUIdentifier:
    Certificate: cacerts/localhost-9054-ca-orderer.pem
    OrganizationalUnitIdentifier: orderer' > ${PWD}/organizations/ordererOrganizations/geakminds.com/msp/config.yaml


  echo
	echo "Register orderer"
  echo
  set -x
	fabric-ca-client register --caname ca-orderer --id.name orderer --id.secret ordererpw --id.type orderer --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
    set +x

  echo
  echo "Register the orderer admin"
  echo
  set -x
  fabric-ca-client register --caname ca-orderer --id.name ordererAdmin --id.secret ordererAdminpw --id.type admin --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

	mkdir -p organizations/ordererOrganizations/geakminds.com/orderers
  mkdir -p organizations/ordererOrganizations/geakminds.com/orderers/geakminds.com

  mkdir -p organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com

  echo
  echo "## Generate the orderer msp"
  echo
  set -x
	fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp --csr.hosts orderer.geakminds.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/config.yaml

  echo
  echo "## Generate the orderer-tls certificates"
  echo
  set -x
  fabric-ca-client enroll -u https://orderer:ordererpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls --enrollment.profile tls --csr.hosts orderer.geakminds.com --csr.hosts localhost --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/ca.crt
  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/signcerts/* ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/server.crt
  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/keystore/* ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/server.key

  mkdir ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem

  mkdir ${PWD}/organizations/ordererOrganizations/geakminds.com/msp/tlscacerts
  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/orderers/orderer.geakminds.com/tls/tlscacerts/* ${PWD}/organizations/ordererOrganizations/geakminds.com/msp/tlscacerts/tlsca.geakminds.com-cert.pem

  mkdir -p organizations/ordererOrganizations/geakminds.com/users
  mkdir -p organizations/ordererOrganizations/geakminds.com/users/Admin@geakminds.com

  echo
  echo "## Generate the admin msp"
  echo
  set -x
	fabric-ca-client enroll -u https://ordererAdmin:ordererAdminpw@localhost:9054 --caname ca-orderer -M ${PWD}/organizations/ordererOrganizations/geakminds.com/users/Admin@geakminds.com/msp --tls.certfiles ${PWD}/organizations/fabric-ca/ordererOrg/tls-cert.pem
  set +x

  cp ${PWD}/organizations/ordererOrganizations/geakminds.com/msp/config.yaml ${PWD}/organizations/ordererOrganizations/geakminds.com/users/Admin@geakminds.com/msp/config.yaml


}

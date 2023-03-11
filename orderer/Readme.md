## Lauching the Orderer

1. ./register-enroll-orderer.sh -> if orderer is not registered with fabric ca server

2. ./generate-genesis.sh -> To generate a genesis block

3. ./generate-channel-tx.sh -> To generate the hospital channel tx

4. ./launch.sh -> To launch the orderer

Notes

&ApplicationDefaultPolicies in config Yaml -> controls the no of orgs admin needs to sign the channel transaction file

## Lauching the Peer

1. First You Have to register the peer under orgs to the fabric server(
   In ca folder, check register-enroll-users.sh
   eg: ./register-enroll-users.sh hospital1 peer1 hospital1.outpatient
   )

2. Create the Channel Transaction file using configtxgen tool (Refer ./generate-channel-tx.sh) in orderer folder

3. Sign the Channel transaction file as hospital1 Admin (sign-channel-tx.sh) & Submit the signed transaction file to the orderer(submit-config-update-tx.sh)

4. SUbmit the signed transaction to the orderer to create a hospital channel (./submit-create-channel.sh)

5. To register a new peer use (./register-enroll-peer.sh orgName peerName)

6. To launch the peer use (./launch-peer.sh hospital1 peer3)

Notes:

For regular peer, Bootstap: has to be set, things to look for in core.yaml (mspId,mspConfigPath,fileSystemPath)

ps -eal | grep peer -> list running peer

## To create the channel (creating the channel does not need any peer)

1. . set-env.sh hospital1 admin

2. ./sign-channel-tx.sh hospital1

3. ./submit-create-channel.sh hospital1

## Lauching the Peer & joining the channel

1. First You Have to register the peer under orgs to the fabric server(
   check register-enroll-peer.sh
   eg: ./register-enroll-peer.sh hospital1 hosp1-peer1
   )

<!-- 2. Create the Channel Transaction file using configtxgen tool (Refer ./generate-channel-tx.sh) in orderer folder

3. Sign the Channel transaction file as hospital1 Admin (. set-env.sh hospital1 admin)(./sign-channel-tx.sh hospital1) & Submit the signed transaction file to the orderer(submit-config-update-tx.sh) -->

<!-- 4. SUbmit the signed transaction to the orderer to create a hospital channel (./submit-create-channel.sh hospital1) -->

5. To join the channel use (. set-env.sh hospital1 hosp1-peer1)(./launch-peer.sh hospital1 hosp1-peer1)(./join-hospital-channel.sh hospital1 hosp1-peer1)

6. To register a new peer use Repeat the above steps with different peer port address(with new peer address like 8050)(./join-regular-peer-to-hospitalchannel.sh hospital1 hosp1-peer2 8050)

Notes:

For regular peer, Bootstap: has to be set, things to look for in core.yaml (mspId,mspConfigPath,fileSystemPath)

ps -eal | grep peer -> list running peer

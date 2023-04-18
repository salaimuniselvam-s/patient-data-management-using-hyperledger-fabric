### Hospital Fabric Network

It is developed based on the Fabric documentation's test-network.

1. Use the following command to start the network, with 2 organization hospital1 and hospital2 with one peer each (peer0) and an Orderer node & then create an hospital-channel & deploy & Instantiate the hospital Contract on two peers.

```bash
$ ./hospitalNetwork.sh up
```

2. Use the Following Command to test the Chaincode is Successfully Installed & Instantiated on Two Peers

```bash
$ ./hospitalNetwork.sh validate
```

3. Use the Following Command to add Hospital 3 to the hospital network. <br>( Note: Hospital Network must be up and running before adding hospital-3 )

```bash
$ ./hospitalNetwork.sh addHosp3
```

4. Use this command to bring the network down

```bash
$ ./hospitalNetwork.sh down
```

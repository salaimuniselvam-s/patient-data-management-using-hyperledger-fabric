## Adding Hospital3 to the test network

You can use the `addHospital3.sh` script to add another organization to the Fabric test network. The `addHospital3.sh` script generates the Hospital3 crypto material, creates an Hospital3 organization definition, and adds Hospital3 to a channel on the test network.

You first need to run `./network.sh up createChannel` in the `test-network` directory before you can run the `addHospital3.sh` script.

```
./network.sh up createChannel
cd addHospital3
./addHospital3.sh up
```

If you used `network.sh` to create a channel other than the default `mychannel`, you need pass that name to the `addorg3.sh` script.

```
./network.sh up createChannel -c channel1
cd addHospital3
./addHospital3.sh up -c channel1
```

You can also re-run the `addHospital3.sh` script to add Hospital3 to additional channels.

```
cd ..
./network.sh createChannel -c channel2
cd addHospital3
./addHospital3.sh up -c channel2
```

For more information, use `./addHospital3.sh -h` to see the `addHospital3.sh` help text.

# Patient Data Management using Hyperledger Fabric

Patient data management solution built on Hyperledger Fabric provides a highly secure and scalable platform for sharing patient data across healthcare providers.

With advanced features such as smart contracts, access control, and consent management, we ensure that patient data is accessed only by authorized parties and in a transparent manner

Our solution is designed to integrate seamlessly with existing healthcare systems, allowing healthcare providers to access patient data without disrupting their workflows. With a focus on patient privacy and security, our solution empowers healthcare providers to make informed decisions and deliver the best possible care to their patients..

## Fabric Network configuration

### Prerequisite

Follow the instructions given in the link to install necessary tools and to configure the system: https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html

### Bring up the network

Follow the instructions to successfully setup the hospital network.

1. Clone / Download the repository

```bash
$ git clone https://github.com/salaimuniselvam-s/Hospital_Fabric.git
```

2. **Before starting with the network is set-up start the docker.**

3. Run the following command to install the binaries and images.

```bash
$ curl -sSLO https://raw.githubusercontent.com/hyperledger/fabric/main/scripts/install-fabric.sh && chmod +x install-fabric.sh

$ ./install-fabric.sh docker
```

4. Change the working directory to /fabric-samples/pdm-network

```bash
$ cd ./docker/hospital-network
```

5. Use the following command to start the network, with 2 organization hospital1 and hospital2 with one peer each (peer0) and an Orderer node & then create an hospital-channel & deploy & Instantiate the hospital Contract on two peers.

```bash
$ ./upNetwork.sh up
```

7. Use the Following Command to test the Chaincode is Successfully Installed & Instantiated on Two Peers

```bash
$ ./upNetwork.sh validate
```

8. Use this command to bring the network down

```bash
$ ./network.sh down
```

## Troubleshooting

Incase if any of the commands fail due to configurations or the network was not brought down properly use the following commands to clear the corrupted docker images and fix the issue.

1. Stop the containers.

```bash
$docker stop $(docker ps -a -q)
```

2. Remove the containers

```bash
$docker rm -f $(docker ps -aq)
```

3. Remove all unused images not just dangling ones

```bash
$docker system prune -a
```

4. Remove all unused local volumes

```bash
$docker volume prune
```

5. Restart the docker.

6. Once the docker is up ,open a new terminal and download the images. (same as Step 3 in Bring up the network section)

```bash
$ curl -sSL https://bit.ly/2ysbOFE | bash -s
```

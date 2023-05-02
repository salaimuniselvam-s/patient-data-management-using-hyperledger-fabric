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
$ git clone https://github.com/salaimuniselvam-s/patient-data-management-using-hyperledger-fabric
```

2. **Before starting with the network is set-up start the docker.**

3. Run the following command to pull the docker images.

```bash
$ curl -sSL https://bit.ly/2ysbOFE | bash -s --  2.0.1 1.5.5 -s -b

```

It will pull the respective fabric docker images for the binaries.

4. Change the working directory to hospital-network

```bash
$ cd ./hospital-network
```

5. Use the following command to start the network, with 2 organization hospital1 and hospital2 with one peer each (peer0) and an Orderer node & then create an hospital-channel & deploy & Instantiate the hospital Contract on two peers.

```bash
$ ./hospitalNetwork.sh up
```

7. Use the Following Command to test the Chaincode is Successfully Installed & Instantiated on Two Peers

```bash
$ ./hospitalNetwork.sh validate
```

8. Use the Following Command to Pause the hospital network (it will stop all the containers but does not remove the ledger details)

```bash
$ ./hospitalNetwork.sh pause
```

9. Use the Following Command to Start the paused network

```bash
$ ./hospitalNetwork.sh start
```

10. Use this command to bring the network down <br>
    (Note: this will remove all the ledger details )

```bash
$ ./hospitalNetwork.sh down
```

## Hospital Node Server

Hospital Node Server is a Node.js server for connecting Client apps to hospital fabric network for interacting with hospital chaincode using http api endpoints.

### Installation

1. Change the working directory to /hospital-sdk/fabric-network

```bash
$ cd ./hospital-sdk/fabric-network
```

2. Install dependencies

```bash
$ npm install
```

this will install the packages used for connecting fabric-client to the fabric network

3. Change the working directory to /hospital-sdk/node-server

```bash
$ cd ./hospital-sdk/node-server
```

4. Install dependencies

```bash
$ npm install
```

3. Set up environment variables

```bash
$ cp .env.example .env
```

It will set the admin credentials for the mongodb containers into the .env file. <br>
(Note: Modification of the credientials in the .env file will lead to connection error with the mongodb container.)

### Usage

1. Start the server

```bash
$ npm start
```

This will start the server on port 3001.

2. Register and Enroll the Users. In Another Terminal, run the following command.

```bash
$ npm enroll
```

This will register,enroll and Create Wallet for Test users.

3. Access the Swagger documentation

```bash
$ http://localhost:3001/api-docs/
```

This will open the Swagger UI, which provides an easy way to explore and test the API.

## Hospital Client

This is a web application for a hospital client to interact with the hospital chaincode deployed on hospital Fabric Network for managing Patient Data. It is built with Next.js, React, Redux, and other popular libraries.

### Installation

To get started with this project, you will need to have Node.js installed on your computer.

1. Change the working directory to /hospital-client

```bash
$ cd ./hospital-client
```

2. Install dependencies

```bash
$ yarn
```

3. After installing the dependencies, you can start the development server with the following command:

```bash
$ npm run dev
```

The development server will start at http://localhost:3000 by default. Open this URL in your web browser to view the application.

### Test User Credentials

Below Test User Credentials are Created When running npm enroll in the hospital Node Server.

| username       | password      | role    |
| -------------- | ------------- | ------- |
| hosp1admin     | hosp1adminpw  | admin   |
| hosp2admin     | hosp2adminpw  | admin   |
|                |               |         |
| Raj Kumar      | temp-password | patient |
| Deepan Raj     | temp-password | patient |
| Mahesh Kumar   | temp-password | patient |
| Viki           | temp-password | patient |
| Ramesh         | temp-password | patient |
|                |               |         |
| Rajesh Kumar   | temp-password | doctor  |
| Kailash Balaji | temp-password | doctor  |
| Deepak         | temp-password | doctor  |
| Mahesh Babu    | temp-password | doctor  |
| hosp2doctor    | temp-password | doctor  |
|                |               |         |

## QuickStart Network

1. To start the network with hospital-client and hospital-sdk as a docker container, you can use the following command.

```bash
$ cd ./hospital-network
$ ./hospitalNetwork.sh quickstart
```

It will setup the hospital-fabric-network, and also start the hospital-client web app in a container.

You can access the hospital-web-app in [localhost:3000](http://localhost:3000/)

2. Use the follwing command to bring down the hospital-network, hospital-client and sdk containers

```bash
$ ./hospitalNetwork.sh shutdown
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
$ curl -sSL https://bit.ly/2ysbOFE | bash -s --  2.0.1 1.5.5 -s -b
```

## Acknowledgments

We would like to express our gratitude to the following individuals and organizations for their contributions and support to our Fabric project:

- The Hyperledger Fabric community for developing and maintaining such a powerful and flexible platform for enterprise blockchain solutions.
- The authors and contributors of the following open-source projects, which we used extensively in our project:
  - [Network Samples](https://github.com/hyperledger/fabric-samples) by Hyperledger Fabric
  - [Patient Data Management Project](https://github.com/sgirdhar/hyperledger-fabric-patient-data-management) by [Sgirdhar](https://github.com/sgirdhar), [Vineet Bhat](https://github.com/bhatvineeth), [Towfi Caziz](https://github.com/towficaziz) and [Faraz Shamim](https://github.com/farazshamim9)

## Note

- This project is not yet production-ready and is intended for learning purposes only.

- This project is a Hyperledger Fabric network implementation that showcases the basic features of Fabric and demonstrates how to interact with the network using chaincodes.

- We created this project as a learning exercise to help us understand the basics of Fabric and how to build decentralized applications using the platform. We hope that it can serve as a starting point for others who are also interested in learning more about Fabric.

- Please keep in mind that this project is a work in progress and may contain bugs or other issues. We welcome feedback and contributions from the community to help improve the project.

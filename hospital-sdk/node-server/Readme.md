## Hospital Node Server

Hospital Node Server is a Node.js server for managing patient data using Hyperledger Fabric. It provides a secure and decentralized way to manage patient data that can be easily accessed by authorized healthcare providers.

### Features

- Uses Hyperledger Fabric for secure and decentralized data management
- Provides REST APIs for easy integration with frontend applications
- Supports user authentication and authorization using JSON Web Tokens
- Uses MongoDB for persistent storage of user and patient data
- Provides Swagger documentation for easy API reference

### Installation

1. Install dependencies

```bash
$ npm install
```

2. Set up environment variables

```bash
$ cp .env.example .env
```

Set your Mongodb Credientails on the env file to store user login credentials.

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

### License

This project is licensed under the ISC License

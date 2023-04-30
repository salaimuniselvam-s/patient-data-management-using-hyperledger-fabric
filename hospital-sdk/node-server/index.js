/**
 * @author Salai Muni Selvam
 * @desc NodeJS APIs to interact with the fabric network.
 */

// Classes for Node Express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const chalk = require("chalk");
const open = require("open");
const mongoose = require("mongoose");
require("dotenv").config();

// Express Application init
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const deleteRoute = require("./db/deleteRecords");
const storeAdminCredentials = require("./db/storeAdminCredentials");
const isUserRegistered = require("./db/isUserRegistered");
const allUsers = require("./db/allUsers");
const enrollAdmins = require("./enrollUsers/initAdmins");

// Swagger Docs
const swaggerDocument = YAML.load("./docs/swaggerConfig.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ROUTES */
app.use("/admin", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/auth", authRoutes);

// Testing Purpose Routes
// app.use("/deleteRecords", deleteRoute);
app.use("/storeAdminCredentials", storeAdminCredentials);
app.use("/users/registered", isUserRegistered);
app.use("/users/_all", allUsers);

const port = 3001;
const isDocker = process.env.DOCKER_ENV ? true : false;
const connectionParams = isDocker ? "@mongo:27017" : "@localhost:27018";

app.get("/", (req, res) =>
  res.send(
    `Welcome to the Fabric-Node-Server.. Visit http://localhost:${port}/api-docs to view all the http endpoint in the node server`
  )
);

// Mongodb Connection
// const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ndk0ctm.mongodb.net/?retryWrites=true&w=majority`;

console.log("Connecting To MongoDb...");

mongoose
  // .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .connect(
    `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}${connectionParams}/UserCredentials`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");

    // Starting Server
    app.listen(port, () => {
      const serverUrl = `http://localhost:${port}`;
      console.log(`Server running at ${chalk.blue.bold(serverUrl)}`);
      open(`${serverUrl}/api-docs`);

      // Creating Wallets for Admins
      enrollAdmins();

      if (isDocker) {
        require("./enrollUsers/initServer");
      }
    });
  })
  .catch((error) => console.error(error));

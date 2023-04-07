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

// Swagger Docs
const swaggerDocument = YAML.load("./docs/swaggerConfig.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ROUTES */
app.use("/admin", adminRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/auth", authRoutes);
app.use("/deleteRecords", deleteRoute);

app.get("/", (req, res) => res.send("Welcome to the Fabric-Node-Server"));

// Mongodb Connection
const uri = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.ndk0ctm.mongodb.net/?retryWrites=true&w=majority`;

const port = 3001;

console.log("Connecting To MongoDb...");
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Starting Server
    app.listen(port, () => {
      const serverUrl = `http://localhost:${port}`;
      console.log(`Server running at ${chalk.blue.bold(serverUrl)}`);
      // open(`${serverUrl}/api-docs`);
    });
  })
  .catch((error) => console.error(error));

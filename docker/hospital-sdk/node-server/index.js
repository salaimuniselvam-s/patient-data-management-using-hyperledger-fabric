/**
 * @author Salai Muni Selvam
 * @desc NodeJS APIs to interact with the fabric network.
 * @desc Look into API docs for the documentation of the routes
 */

// Classes for Node Express
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

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

/* ROUTES */
app.use("/admin", adminRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/auth", authRoutes);

app.listen(3001, () => console.log("Backend server running on 3001"));

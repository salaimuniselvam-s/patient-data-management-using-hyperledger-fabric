const mongoose = require("mongoose");

// Define a schema for a userDetails
const userDetailsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
  },
});

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

// Create a model for the user details schema
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
const TokenSchema = mongoose.model("Tokens", tokenSchema);

module.exports = { UserDetails, TokenSchema };

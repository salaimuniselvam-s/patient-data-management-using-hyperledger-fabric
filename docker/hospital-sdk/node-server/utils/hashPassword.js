const bcrypt = require("bcrypt");

const hashPassword = (password, sampleSalt) => {
  const salt = sampleSalt || bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (passwordToCheck, hashedPassword) => {
  return bcrypt.compareSync(passwordToCheck, hashedPassword);
};

module.exports = { hashPassword, comparePassword };

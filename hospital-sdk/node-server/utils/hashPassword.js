const bcrypt = require("bcrypt");

const hashPassword = (password, sampleSalt) => {
  console.log(password, sampleSalt, "password, sampleSalt");
  const salt = sampleSalt || bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (passwordToCheck, hashedPassword) => {
  console.log(
    passwordToCheck,
    hashedPassword,
    "passwordToCheck, hashedPassword"
  );
  return bcrypt.compareSync(passwordToCheck, hashedPassword);
};

module.exports = { hashPassword, comparePassword };

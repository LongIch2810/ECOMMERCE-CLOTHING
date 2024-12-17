const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = ({ id, role }) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports = generateToken;

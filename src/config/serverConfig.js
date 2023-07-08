const dotenv = require("dotenv").config();

module.exports = {
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT,
};

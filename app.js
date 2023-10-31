const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
//dotenv.config();
const app = express();
app.use(express.json());
//console.log(process.env.DATABASE_NAME);
module.exports = app;

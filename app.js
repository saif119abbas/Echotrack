const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const userRouters = require("./router/userRouter");
//dotenv.config();
const app = express();
app.use(express.json());
app.use(process.env.BASE_URL, userRouters);
module.exports = app;

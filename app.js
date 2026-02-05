require("dotenv").config();
const express = require("express");
const app = express();

const {sessionInitialization}=require("./session_aunthenticate")
//const jwt=require("jsonwebtoken")

const cookieParser = require("cookie-parser")
app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongoDB_url)
  .then(() => console.log("DB connected...!!"));

app.use(sessionInitialization)
const appRouter = require('./routes/index');
app.use('/API', appRouter)
  

app.listen(process.env.port, () => {
  console.log(`Server running at port ${process.env.port}`);
});

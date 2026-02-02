require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongoDB_url)
  .then(() => console.log("DB connected...!!"));

const employeeRoutes = require("./API's/employee/index.js");
const authRoutes = require("./API's/Auth/index.js");

app.use("/API", employeeRoutes);
app.use("/API", authRoutes);

app.listen(process.env.port, () => {
  console.log(`Server running at port ${process.env.port}`);
});

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.mongoDB_url)
  .then(() => console.log("DB connected...!!"));


const appRouter = require('./routes');
app.use('/api', appRouter)
  

app.listen(process.env.port, () => {
  console.log(`Server running at port ${process.env.port}`);
});

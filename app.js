require('dotenv').config()

const express=require("express")
const app=express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const emp_router=require("./API's/employee/emp.controller.js")
const emp=require("./models/emp_schema")

const auth_router=require("./API's/Auth/index.js")
const user_Schema=require("./models/user_Schema.js")

const mongoose=require("mongoose")
mongoose.connect(process.env.mongoDB_url)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/API',emp_router)

app.use('/API',auth_router)

app.listen(process.env.port,()=>{
    console.log(`the server is running at port ${process.env.port}...!!`)
})


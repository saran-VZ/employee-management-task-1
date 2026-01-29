const express=require("express")
const app=express()

const emp_router=require("./API's/emp_exp")

const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost/employee_management")
const emp=require("./models/emp_schema")

app.use("/api/employees",emp_router)

app.listen(5000,()=>{
    console.log("the server is running at port 5000....!!")
})

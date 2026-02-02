const express=require("express")
const router=express.Router()

const emp_router=require("./emp.controller")
router.use("/employees",emp_router)

module.exports=router
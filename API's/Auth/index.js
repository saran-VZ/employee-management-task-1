const express=require("express")
const router=express.Router()

const auth_router=require("./auth.controller.js")
router.use("/auth",auth_router)

module.exports=router
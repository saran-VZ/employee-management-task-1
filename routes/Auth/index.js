const express=require("express")
const router=express.Router()

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


const {signin}=require('./auth.controller')
const{signup}=require('./auth.controller')


router.post('/signin',signin)
router.post('/signup',signup)

module.exports=router
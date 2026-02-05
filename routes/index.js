const express = require("express");
const router = express.Router();
const authRouter = require('./Auth')
const employeeRouter = require('./employee')
const {isAuthenticated}=require("../session_aunthenticate")

router.use('/auth', authRouter);

router.use(isAuthenticated)

router.use('/employees', employeeRouter)

module.exports = router
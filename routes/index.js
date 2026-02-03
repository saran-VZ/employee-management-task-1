const express = require("express");
const router = express.Router();
const authRouter = require('./Auth')
const employeeRouter = require('./employee')

router.use('/auth', authRouter);
router.use('/employees', employeeRouter)

module.exports = router
const express = require("express");
const router = express.Router();

const empRouter = require("./emp.controller");

router.use("/employees", empRouter);

module.exports = router;

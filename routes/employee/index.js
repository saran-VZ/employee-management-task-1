const express = require("express");
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({ extended: true }));



//const jwtAuth=require("../../JWTauth.js")
//router.use(jwtAuth)

const {getAll,getById,addNew,deleteById,editById} = require("./emp.controller")


router.get('/',getAll)
router.get('/:id',getById)
router.post('/',addNew)
router.delete('/:id',deleteById)
router.put('/:id',editById)


module.exports = router;

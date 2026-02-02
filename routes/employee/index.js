const express = require("express");
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const jwtAuth=require('/home/saran-st/Documents/task1-emp/JWTauth.js')

const {get_all,get_by_id,add_new,delete_by_id,edit_by_id} = require("./emp.controller");
router.use(jwtAuth)

router.use(jwtAuth);

router.get('/',get_all)
router.get('/:id',get_by_id)
router.post('/',add_new)
router.delete('/:id',delete_by_id)
router.put('/:id',edit_by_id)

module.exports = router;

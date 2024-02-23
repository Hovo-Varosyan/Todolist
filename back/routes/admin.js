const express = require('express')
const Admin = require('../controller/admin')
const router = express.Router()

router.get('/', Admin.userList)

module.exports=router
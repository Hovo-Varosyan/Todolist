var express = require("express");
const Login = require("../controller/login");
const JwtVerification = require("../utils/veryfication");
const taskRouter = require('./task');
const AdminVeryfication = require("../utils/adminveryfication");
const adminRouter=require('./admin');
const homeRouter=require('./home')
var router = express.Router();

router.post('/logout', JwtVerification, Login.logout)
router.post("/registr", Login.registr);
router.post("/login", Login.login);

router.use('/home', JwtVerification, homeRouter)
router.use('/task', JwtVerification, taskRouter)
router.use('/userlist', JwtVerification, AdminVeryfication, adminRouter)

module.exports = router;

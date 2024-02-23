var express = require("express");
const Login = require("../controller/login");
const Task = require("../controller/task");
const JwtVerification = require("../utils/veryfication");
const taskRouter = require('./task');
const AdminVeryfication = require("../utils/adminveryfication");
const AdminRouter=require('./admin')
var router = express.Router();

//login
router.post('/logout', JwtVerification, Login.logout)
router.post("/registr", Login.registr);
router.post("/login", Login.login);
//home
router.route('/')
    .get(JwtVerification, Task.task)
    .delete(JwtVerification, Task.delete)
    .post(JwtVerification, Task.done)
    .patch(JwtVerification, Task.edit)
//task
router.use('/task', JwtVerification, taskRouter)
router.use('/userlist', JwtVerification, AdminVeryfication, AdminRouter)
module.exports = router;

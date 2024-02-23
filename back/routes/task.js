const Task = require("../controller/task");
const express=require('express')
var router = express.Router();

router.get('/:id', Task.getTask)
router.post("/add", Task.add);


module.exports = router
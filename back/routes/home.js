var express = require("express");
const Task = require("../controller/task");
const router = express.Router();

router.route("/")
    .delete(Task.delete)
    .post(Task.done)
    .patch(Task.edit);
router.get("/:page?", Task.task);
// router.arguments(1)
module.exports = router;

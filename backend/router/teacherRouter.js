const express = require("express");
const router = express.Router();
const TeacherController = require("../controller/teacherController");

router.get("/getTeacherReport", TeacherController.getAllTestReport);

module.exports = router;

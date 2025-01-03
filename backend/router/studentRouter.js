const express = require("express");
const router = express.Router();
const StudentController = require("../controller/studentController");

router.get("/profileStudent/image", StudentController.getProfileImage);

router.get("/studenttestview", StudentController.studentTestView);

router.get("/getQuestionStudent/:id", StudentController.getQuestionStudent);

router.post("/marksupdate/:id", StudentController.marksUpdate);

router.get("/statusReportStudent/:id", StudentController.getStatusReport);

router.get("/studentmarks", StudentController.getStudentMarks);

module.exports = router;

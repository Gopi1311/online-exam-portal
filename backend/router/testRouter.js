const express = require("express");
const router = express.Router();

const testController = require("../controller/testController");

// Route for Save a test(CREATE)
router.post("/savetest", testController.saveTest);

//Router for testview BootStrap Card(READ)
router.get("/testview", testController.viewTest);

//VIEW particular TEST BY TEACHER(READ)
router.get("/getQuestions/:id", testController.ParticularTest);

//Update Test BY Teacher(UPDATE)
router.put("/updatetest/:id", testController.updateTest);

//Delete Test By Teacher(DELETE)
router.delete("/deletetest/:id", testController.deleteTest);

module.exports = router;

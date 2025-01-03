const express = require("express");
const router = express.Router();
const multer = require("multer");
const authController = require("../controller/userAuthController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/signup", upload.single("image"), authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;

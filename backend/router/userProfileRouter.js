const express = require("express");
const UserProfileController = require("../controller/userProfileController");
const router = express.Router();

router.get("/profile", UserProfileController.getUserProfile);
router.get("/nametag", UserProfileController.getNameTag);

module.exports = router;

const express = require("express");
const router = express.Router();
const screenController = require("../controller/screenController");
const upload = require("../utils/uploadImage");

router.get("/:project", screenController.read);
router.post("/upload-screen", upload.array("screens"), screenController.uploadScreen);

module.exports = router;

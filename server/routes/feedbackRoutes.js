const express = require("express");
const router = express.Router();
const feedbackController = require("../controller/feedbackController");

router.get("/:screen", feedbackController.getFeedback);

module.exports = router;

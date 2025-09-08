const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");

router.get("/", projectController.read);
router.post("/create", projectController.create);

module.exports = router;

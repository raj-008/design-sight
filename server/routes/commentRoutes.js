const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

router.get("/:screen", commentController.read);
router.post("/create", commentController.create);
router.get("/:comment", commentController.edit);
router.put("/update", commentController.update);
router.patch("/delete", commentController.delete);

module.exports = router;

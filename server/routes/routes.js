const express = require("express");
const router = express.Router();
const projectRoutes = require("../routes/projectRoutes");
const screenRoutes = require("../routes/screenRoutes");
const commentRoutes = require("../routes/commentRoutes");

router.get("/test-backend", (req, res) => {
  res.send("Hii, Backend Started For DesignSight");
});

router.use("/project", projectRoutes);
router.use("/screen", screenRoutes);
router.use("/comment", commentRoutes);

module.exports = router;

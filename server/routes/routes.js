const express = require("express");
const router = express.Router();
const projectRoutes = require("../routes/projectRoutes");
const screenRoutes = require("../routes/screenRoutes");

router.get("/test-backend", (req, res) => {
  res.send("Hii, Backend Started For DesignSight");
});

router.use("/project", projectRoutes);
router.use("/screen", screenRoutes);

module.exports = router;

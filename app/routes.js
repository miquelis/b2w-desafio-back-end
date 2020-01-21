"use strict";

const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");

router.get("/", (req, res) => {
  return res.send("Welcome to the test of B2W");
});

router.use("/auth", require("./routes/auth"));
router.use(authMiddleware);
router.use("/planets", require("./routes/planets"));

module.exports = router;

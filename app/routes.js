const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");

router.get("/", (req, res) => {
  return res.send("B2W");
});

router.post("/auth/register", authController.register);

module.exports = router;

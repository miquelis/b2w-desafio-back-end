const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");

router.get("/", (req, res) => {
  return res.send("B2W");
});

router.post("/auth/register", authController.register);
router.post("/auth/authenticate", authController.authenticate);

router.get("/projects", (req, res) => {
  return res.send({ ok: true, user: req.userId });
});

module.exports = router;

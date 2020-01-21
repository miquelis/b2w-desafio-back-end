const express = require("express");
const router = express.Router();
const authMiddleware = require("./middlewares/auth");

router.get("/", (req, res) => {
  return res.send("B2W");
});

router.use("/auth", require("./routes/auth"));

router.use(authMiddleware);

router.get("/projects", (req, res) => {
  return res.send({ ok: true, user: req.userId });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const authMiddleware = require("./middlewares/auth");

router.get("/", (req, res) => {
  return res.send("B2W");
});

router.post("/auth/register", authController.register);
router.post("/auth/authenticate", authController.authenticate);
router.post("/auth/forgot_password", authController.forgotPassword);
router.post("/auth/reset_password", authController.resetPassword);

router.use(authMiddleware);

router.get("/projects", (req, res) => {
  return res.send({ ok: true, user: req.userId });
});

module.exports = router;

//const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const mailer = require("../utils/mailer");

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

exports.register = async function(req, res) {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: "User already exists" });

    const user = await User.create(req.body);

    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: "Registration falied" });
  }
};

exports.authenticate = async function(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.status(400).send({ error: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).send({ error: "Invalid password" });

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id })
  });
};

exports.forgotPassword = async function(req, res) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).send({ error: "User not found" });

    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });

    mailer.sendMail(
      {
        to: email,
        from: "raphaelmiquelis@gmail.com",
        template: "auth/forgot_password",
        context: { token }
      },
      error => {
        if (error)
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });

        return res.send({ sucesso: "Email enviado!" });
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Error on forgot password, try again" });
  }
};

exports.resetPassword = async function(req, res) {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user) return res.status(400).send({ error: "User not found" });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ error: "Token invalid" });

    const now = new Date();

    if (now > user.passwordResetExpires)
      return res
        .status(400)
        .send({ error: "Token expired, generate a new one" });

    user.password = password;

    await user.save();

    return res.send({ sucesso: "Senha alterada!" });
  } catch (error) {
    return res.status(400).send({ error: "Cannot send forgot password email" });
  }
};

"use strict";

const User = require("../models/users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const mailer = require("../utils/mailer");

/**
 * Gerando o token JWT
 */
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  });
}

/**
 * Registrando um usuário passando os parametros
 * name, email, password
 */
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

/**
 * Autenticando o usuário passando os parametros
 * email, password
 */

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

/**
 * Alterando a senha enviando o email no body o
 * mesmo irá enviar o email para usuário.
 */
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
        from: process.env.MAIL_FROM,
        template: "auth/forgot_password",
        context: { token }
      },
      error => {
        if (error)
          return res
            .status(400)
            .send({ error: "Cannot send forgot password email" });

        return res.send({ success: "Email sent!" });
      }
    );
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Error on forgot password, try again" });
  }
};

/**
 * Alterando a senha passando o email, password e o token enviado por email
 */
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

    return res.send({ success: "Password changed!" });
  } catch (error) {
    return res.status(400).send({ error: "Cannot send forgot password email" });
  }
};

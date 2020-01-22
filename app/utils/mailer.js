"use strict";

const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".html",
      partialsDir: path.resolve("./app/resources/mail/"),
      layoutsDir: path.resolve("./app/resources/mail/"),
      defaultLayout: undefined
    },
    viewPath: path.resolve("./app/resources/mail/"),
    extName: ".html"
  })
);

module.exports = transport;

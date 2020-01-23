"use strict";

const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const config = require("config");
const { host, port, user, pass } = config.get("mail");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
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

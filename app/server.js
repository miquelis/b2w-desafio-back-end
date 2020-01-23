"use strict";

const express = require("express");
const bodyParser = require("body-parser");
// require("dotenv-flow").config();

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }
  routes() {
    this.express.use(require("./routes"));
  }
}

module.exports = new App().express;

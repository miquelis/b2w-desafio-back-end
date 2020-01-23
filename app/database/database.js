"use strict";

const mongoose = require("mongoose");
const config = require("config");
const { uri } = config.get("mongoDB");

try {
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
} catch (error) {
  console.error(error);
}

mongoose.Promise = global.Promise;

module.exports = mongoose;

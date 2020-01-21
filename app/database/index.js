"use strict";

const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGO_URL, {
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

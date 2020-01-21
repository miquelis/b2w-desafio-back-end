const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://miquelis:miquelis123@cluster0-nnhbt.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;

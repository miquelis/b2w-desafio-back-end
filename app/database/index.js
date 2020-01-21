const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb+srv://miquelis:miquelis123@cluster0-nnhbt.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );
} catch (error) {
  console.error(error);
}

mongoose.Promise = global.Promise;

module.exports = mongoose;

const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://sanket:sanket123@e-com.0ylfya9.mongodb.net/e-com?retryWrites=true&w=majority"
  );
};

module.exports = connect;

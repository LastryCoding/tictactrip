const mongoose = require("mongoose");

// Database Connection

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://titactripAdmin:titactripAdmin@tictactripdb.wcsva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected successfully!`);
};

module.exports = connectDB;

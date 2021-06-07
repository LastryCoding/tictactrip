const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  quotaRemaining: {
    type: Number,
    required: false,
    default: 80000,
  },
  tokenString: {
    type: String,
    required: false,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);

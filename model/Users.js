const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  accessCode: {
    type: String,
    required: true,
    min: 2,
    max: 8,
  },
});

const Users = mongoose.model("User", usersSchema);
module.exports = { Users };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commandSchema = new Schema({
  command: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
    default: "done",
  },
});

const Command = mongoose.model("Command", commandSchema);
module.exports = { Command };

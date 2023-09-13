const { Command } = require("../model/Command");

const sendCommand = async (req, res) => {
  const { command } = req.body;
  switch (command) {
    case "forward":
      console.log("forward");
      break;

    case "backward":
      console.log("backward");
      break;

    case "stop":
      console.log("stop");
      break;

    default:
      return res
        .status(400)
        .send("invalid command try either: forward, backward or stop");
  }

  try {
    const docs = await Command.findOne({
      ["command"]: { $exists: true },
    });
    if (docs) {
      docs.command = command;
      await docs.save();
      res.send("command sent");
      docs.feedback = "pending";
      await docs.save();
      console.log("....feedback is pending");
    } else {
      const newCommand = new Command({ command });
      await newCommand.save();
      res.send("new command sent");
    }
  } catch (err) {
    res.status(400).send({ err: `${err}` });
    console.log(err);
  }
};
const getCommand = async (req, res) => {
  try {
    const docs = await Command.findOne({
      ["command"]: { $exists: true },
    });
    if (docs) {
      const { command } = docs;
      res.send({ command: command });
    } else {
      res.send("empty");
    }
  } catch (err) {
    res.status(400).send({ err: `${err}` });
    console.log(err);
  }
};

const resetFeedback = async (req, res) => {
  try {
    const docs = await Command.findOne({
      ["feedback"]: { $exists: true },
    });
    if (docs) {
      docs.command = "stop";
      docs.feedback = "done";
      await docs.save();
      res.send("command reset");
    } else {
      res.status(400).send("Error, no command has ever been made");
    }
  } catch (err) {
    res.status(400).send({ err: `${err}` });
    console.log(err);
  }
};
const sendFeedback = async (req, res) => {
  try {
    const docs = await Command.findOne({
      ["feedback"]: { $exists: true },
    });
    if (docs) {
      docs.feedback = "done";
      await docs.save();
      res.send("feedback sent successfully");
    } else {
      res.send("No command initiated");
    }
  } catch (err) {
    res.status(400).send({ err: `${err}` });
    console.log(err);
  }
};
const getFeedback = async (req, res) => {
  try {
    const docs = await Command.findOne({
      ["command"]: { $exists: true },
    });
    if (docs) {
      const { feedback } = docs;
      res.send({ feedback: feedback });
    } else {
      res.send("empty");
    }
  } catch (err) {
    res.status(400).send({ err: `${err}` });
    console.log(err);
  }
};

module.exports = {
  sendCommand,
  getCommand,
  sendFeedback,
  getFeedback,
  resetFeedback,
};

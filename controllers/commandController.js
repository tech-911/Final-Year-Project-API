const { Command } = require("../model/Command");
const { Users } = require("../model/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// -----------------------Authentication---------------------------------

const createUser = async (req, res) => {
  const { role, accessCode } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(accessCode, salt);

  try {
    const user = await Users.findOne({ role: role });
    if (user) {
      user.accessCode = hashedPassword;
      await user.save();
    } else {
      const newUser = new Users({ role: role, accessCode: hashedPassword });
      await newUser.save();
      res.send("new user created");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: err });
  }
};
const login = async (req, res) => {
  const { role, accessCode } = req.body;
  try {
    const user = await Users.findOne({ role: role });
    if (user) {
      const validPassword = await bcrypt.compare(accessCode, user.accessCode);
      if (!validPassword) return res.status(400).send("Invalid code");

      // Creating jwt token
      const jwtSecretKey = process.env.TOKEN_SECRET;
      const token = jwt.sign({ _id: user._id }, jwtSecretKey);
      let newUser = { user, token };
      res.header("auth-token", token).send(newUser);
    } else {
      res.status(400).send("Unrecognized User");
    }
  } catch (err) {
    console.log(err);
    res.send({ err: err });
  }
};
const userList = async (req, res) => {
  const users = await Users.find({});
  try {
    res.send(users);
  } catch (err) {
    console.log(err);
    res.send({ err: err });
  }
};
// --------------------------End------------------------------

const sendCommand = async (req, res) => {
  const { command } = req.body;
  switch (command) {
    case "forward":
      console.log("forward");
      break;
    case "backward":
      console.log("backward");
      break;
    case "high":
      console.log("high");
      break;
    case "mid":
      console.log("mid");
      break;
    case "low":
      console.log("low");
      break;
    case "stop":
      console.log("stop");
      break;
    default:
      return res
        .status(400)
        .send("invalid command try either: forward, backward, high, mid, low or stop");
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
  createUser,
  login,
  userList,
};

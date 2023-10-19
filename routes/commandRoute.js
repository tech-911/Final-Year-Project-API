const express = require("express");
const router = express.Router();
const verify = require("../verification/verifyToken");
const {
  sendCommand,
  getCommand,
  sendFeedback,
  getFeedback,
  resetFeedback,
  createUser,
  login,
  userList,
} = require("../controllers/commandController");

//--------------Authentication-------------------
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUsers", userList);
//------------------End-------------------
router.post("/postCommand", sendCommand);
router.get("/getCommand", getCommand);
router.post("/postFeedback", sendFeedback);
router.get("/getFeedback", getFeedback);
router.get("/refresh", resetFeedback);
module.exports = router;

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
router.get("/getCommand", getCommand); //----------for hardware--------------
router.post("/postFeedback", sendFeedback); //----------for hardware--------------
router.post("/postCommand", verify, sendCommand);
router.get("/getFeedback", verify, getFeedback);
router.get("/refresh", verify, resetFeedback);
module.exports = router;

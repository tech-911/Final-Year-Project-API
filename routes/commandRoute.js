const express = require("express");
const router = express.Router();

const { sendCommand, getCommand, sendFeedback, getFeedback, resetFeedback } = require("../controllers/commandController");



router.post("/postCommand", sendCommand);
router.get("/getCommand", getCommand);
router.post("/postFeedback", sendFeedback);
router.get("/getFeedback", getFeedback);
router.get("/refresh", resetFeedback);
module.exports = router;

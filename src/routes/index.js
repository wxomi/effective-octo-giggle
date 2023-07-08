const express = require("express");
const {
  getRevisionTrackerController,
  createRevisionTrackerController,
} = require("../controllers/RevisionTracker");

const router = express.Router();

router.post("/revise", createRevisionTrackerController);

router.get("/revise", getRevisionTrackerController);

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;

const express = require("express");
const {
  getRevisionTrackerController,
  createRevisionTrackerController,
} = require("../controllers/RevisionTracker");

const router = express.Router();

router.post("/revise", createRevisionTrackerController);

router.get("/revise", getRevisionTrackerController);

module.exports = router;

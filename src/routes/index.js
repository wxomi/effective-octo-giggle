const express = require("express");
const {
  getRevisionTrackerController,
  createRevisionTrackerController,
  getTodayQuestionsController,
  updateTodayQuestionsController,
} = require("../controllers/RevisionTracker");

const router = express.Router();

router.post("/revise", createRevisionTrackerController);
router.put("/revise/:id", updateTodayQuestionsController);

router.get("/revise", getRevisionTrackerController);

router.get("/today", getTodayQuestionsController);

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;

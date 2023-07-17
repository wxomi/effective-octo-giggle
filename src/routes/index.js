const express = require("express");
const {
  getRevisionTrackerController,
  createRevisionTrackerController,
  getTodayQuestionsController,
  updateTodayQuestionsController,
  getAllQuestionsController,
  createTodoQuestionsController,
  getTodoQuestionsController,
  updateTodosQuestionsController,
} = require("../controllers/RevisionTracker");

const router = express.Router();

router.post("/revise", createRevisionTrackerController);
router.put("/revise/:id", updateTodayQuestionsController);

router.get("/revise", getRevisionTrackerController);
router.get("/questions", getAllQuestionsController);

router.get("/today", getTodayQuestionsController);

router.get("/todos", getTodoQuestionsController);
router.post("/todos", createTodoQuestionsController);
router.put("/todos/:id", updateTodosQuestionsController);

router.get("/ping", (req, res) => {
  res.send("pong");
});

module.exports = router;

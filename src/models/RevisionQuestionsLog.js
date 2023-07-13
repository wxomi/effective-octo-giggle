const mongoose = require("mongoose");

const RevisionQuestionsLogSchema = mongoose.Schema({
  questions: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RevisionQuestionsLog = mongoose.model(
  "RevisionQuestionsLog",
  RevisionQuestionsLogSchema
);

module.exports = RevisionQuestionsLog;

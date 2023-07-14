const mongoose = require("mongoose");

const RevisionQuestionsLogSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RevisionQuestionsLog = mongoose.model(
  "revisionquestionslogs",
  RevisionQuestionsLogSchema
);

module.exports = RevisionQuestionsLog;

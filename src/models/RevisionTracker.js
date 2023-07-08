const mongoose = require("mongoose");

const RevisionTrackerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  revisionRequired: {
    type: Number,
    required: true,
  },
  revised: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nextRevision: {
    type: Number,
  },
  nextRevision: {
    type: Date,
  },
});

const RevisionTracker = mongoose.model(
  "RevisionTracker",
  RevisionTrackerSchema
);

module.exports = RevisionTracker;

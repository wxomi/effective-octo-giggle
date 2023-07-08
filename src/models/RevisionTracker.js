const mongoose = require("mongoose");

const RevisionTrackerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  revisonCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const RevisionTracker = mongoose.model(
  "RevisionTracker",
  RevisionTrackerSchema
);

module.exports = RevisionTracker;

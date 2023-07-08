const mongoose = require("mongoose");

const IDs = new mongoose.Schema({
  ids: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("IDs", IDs);

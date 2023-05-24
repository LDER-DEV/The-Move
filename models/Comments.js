const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  venueID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  moveID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Moves",
  },
  userName: {
    type: String,
    ref: "Moves",
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);

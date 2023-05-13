const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  madeBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

module.exports = mongoose.model("Comments", CommentsSchema);

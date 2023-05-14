const mongoose = require("mongoose");

const MovesSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  venueName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: undefined
  },
  startTime: {
    type: String,
    default: undefined
  },
  endDate: {
    type: Date,
    default: undefined
  },
  endTime: {
    type: String,
    default: undefined
  },
});

module.exports = mongoose.model("Moves", MovesSchema);

const mongoose = require("mongoose");

const MovesSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
    default: 'https://res.cloudinary.com/daniwk9uv/image/upload/v1684872137/Gradient_Square_Typography_Fashion_Brand_Logo_lxjjno.png',
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  artists: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  venueId: {
    type: String,
    required: true,
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
  ApprovalStatus: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("Moves", MovesSchema);

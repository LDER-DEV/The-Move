const mongoose = require("mongoose");

const tracksSchema = new mongoose.Schema({
  trackName: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  uploadedBy: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("tracks", tracksSchema);

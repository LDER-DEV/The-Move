const mongoose = require("mongoose");

const MovesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  eventImage: {
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
  when: {
    type: Date,
    default: undefined
  },

});

module.exports = mongoose.model("Moves", MovesSchema);

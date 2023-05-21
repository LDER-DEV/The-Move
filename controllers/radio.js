const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Profile = require('../models/User')
const Track = require('../models/Tracks')

module.exports = {
  getRadio: async (req, res) => {
    try {
      const moves = await Moves.find({ moves: req.moves });
      const profile = await Profile.findById(req.params.id);
      const tracks = await Track.find({ tracks: req.tracks });
      res.render("radio.ejs", { moves: moves, user: req.user, profile: profile, tracks: tracks  });
      console.log()
    } catch (err) {
      console.log(err);
    }
  }



};
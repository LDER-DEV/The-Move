const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Profile = require('../models/User')
const Track = require('../models/Tracks')

module.exports = {
  getRadio: async (req, res) => {
    try {
      const moves = await Moves.find({ moves: req.moves });
      const profile = await Profile.findById(req.params.id);
      const trackListing = await Track.find({});
      const songUrls = trackListing.map(track => track.song);
      res.render("radio.ejs", { moves, user: req.user, profile, tracks: songUrls , trackListing: trackListing});
    } catch (err) {
      console.log(err);
    }
  }
};
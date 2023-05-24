const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Profile = require('../models/User')
const Track = require('../models/Tracks');

module.exports = {
  getRadio: async (req, res) => {
    try {
      const moves = await Moves.find({ moves: req.moves });
      const profile = await Profile.findById(req.params.id);
      const trackListing = await Track.find({});
      const songUrls = trackListing.map((track) => track.song);
      res.render('radio.ejs', {
        moves,
        user: req.user,
        profile,
        tracks: songUrls,
        trackListing: trackListing,
      });
    } catch (err) {
      console.log(err);
    }
  },

  // Add a new route to handle the "/tracks" endpoint
 getTracks: async (req, res) => {
    try {
      const tracks = await Track.find({});
      const formattedTracks = tracks.map((track) => {
        return {
          _id: track._id,
          trackName: track.trackName,
          song: track.song,
          cloudinaryId: track.cloudinaryId,
          uploadedBy: track.uploadedBy,
        };
      });
      res.json(formattedTracks);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

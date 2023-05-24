const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Profile = require('../models/User');
const Comments = require('../models/Comments');
const Track = require('../models/Tracks');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const moves = await Moves.find({ moves: req.moves });

      const profile = await Profile.findById(req.params.id);
      const tracks = await Track.find({ tracks: req.tracks });
      res.render("profile.ejs", { moves: moves, user: req.user, profile: profile, tracks: tracks  });
      console.log()
    } catch (err) {
      console.log(err);
    }
  },
  getVenues: async (req, res) => {
    try {
      const venues = await Profile.find().sort({ createdAt: "desc" }).lean();
      res.render("Venues.ejs", { venues: venues, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getMoves: async (req, res) => {
    try {
      const moves = await Moves.find().sort({ createdAt: "desc" }).lean();
      const venues = await Profile.find().sort({ createdAt: "desc" }).lean();
      res.render("Moves.ejs", { moves: moves, venues:venues, user: req.user, });
    } catch (err) {
      console.log(err);
    }
  },

  getEvent: async (req, res) => {
    try {
      const artists = await Profile.find().sort({ userName: 1 }).lean();
      const moves = await Moves.findById(req.params.id);
      const comment = await Comments.find({moveID: req.params.id});
      res.render("event.ejs", { moves: moves, user: req.user,artists: artists , comment: comment});
    } catch (err) {
      console.log(err);
    }
  },

  getUsers: async (req, res) => {
    try {
      const profile = await Profile.find().sort({ userName: 1 });
      res.render("artists.ejs", { profile: profile, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto",  });

      await Moves.create({
        eventTitle: req.body.eventTitle,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        description: req.body.description,
        artists: req.body.artists,
        user: req.user.id,
        venueId: req.body.venueId,
        venueName: req.body.venueName,
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
      });
      console.log("Post has been added!");
      res.redirect(`/profile/${req.user._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  createTrack: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto",  });

      await Track.create({
        trackName: req.body.trackName,
        song: result.secure_url,
        cloudinaryId: result.public_id,
        uploadedBy: req.body.uploadedBy,
      });
      console.log("Post has been added!" ,req.user._id);
      res.redirect(`/profile/${req.user._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteTrack: async (req, res) => {
    try {
      // Find track by id
      const track = await Track.findById(req.body.id);
  
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(track.cloudinaryId);
  
      // Delete track from db
      await Track.deleteOne({ _id: req.body.id });
  
      console.log("Deleted Track");
      res.redirect(`/profile/${req.user.id}`);
    } catch (err) {
      console.error(err);
      res.redirect(`/profile/${req.user.id}`);
    }
  },
  approveMove: async (req, res) => {
    try {
      await Moves.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { ApprovalStatus: 'true' },
        }
      );
      console.log("your event is approved!");
      res.redirect(`/moves/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  denyMove: async (req, res) => {
    try {
      await Moves.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { ApprovalStatus: 'false' },
        }
      );
      console.log("your event is approved!");
      res.redirect(`/moves/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let moves = await Moves.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(moves.cloudinaryId);
      // Delete post from db
      await Moves.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/profile/${req.user._id}`);
    } catch (err) {
      res.redirect(`/profile/${req.user._id}`);
    }
  },
  commentPost: async (req, res) => {
    try {
 
      await Comments.create({
        comment: req.body.comment,
        venueID: req.user.id,
        moveID: req.params.id,
        userName: req.user.userName
      });
      console.log("comment has been added!");
      res.redirect(`/moves/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
   

};

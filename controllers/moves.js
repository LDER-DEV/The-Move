const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Comments = require("../models/Comments")
const Profile = require('../models/User')
const Track = require('../models/Tracks')
module.exports = {
  getProfile: async (req, res) => {
    try {
      const moves = await Moves.find({ moves: req.moves });
      const profile = await Profile.findById(req.params.id)
      res.render("profile.ejs", { moves: moves, user: req.user, profile: profile  });
      console.log()
    } catch (err) {
      console.log(err);
    }
  },
  getVenues: async (req, res) => {
    try {
      const venues = await Profile.find().sort({ createdAt: "desc" }).lean();
      res.render("venues.ejs", { venues: venues, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const moves = await Moves.findById(req.params.id);
      const comment = await Comments.find().sort({ createdAt: "desc" }).lean();
      res.render("event.ejs", { moves: moves, user: req.user, comments: comment});
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
        user: req.user._id,
        venueId: req.body.venueId,
        venueName: req.body.venueName,
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
      });
      console.log("Post has been added!");
      res.redirect(`/profile/${req.params.id}`);
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
  approveMove: async (req, res) => {
    try {
      await Moves.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { ApprovalStatus: true },
        }
      );
      console.log("your event is approved!");
      res.redirect(`/event/${req.params.id}`);
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
        madeBy: req.user.id,
        postID: req.params.id
      });
      console.log("comment has been added!");
      res.redirect(`/event/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
   deleteComment: async (req, res) => {
    try {
  
      // Delete post from db
      await Comments.remove({ _id: req.comments.comment });
      console.log(req.comments.comment)
      console.log("Deleted Post");
      res.redirect(`/event/${req.params.id}`);
    } catch (err) {
      res.redirect(`/event/${req.params.id}`);
    }
  },
};

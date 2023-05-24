
const cloudinary = require("../middleware/cloudinary");
const Moves = require("../models/Moves");
const Profile = require('../models/User')
const Track = require('../models/Tracks');



module.exports = {
editProfile: async (req, res) => {
  try {
   
      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto",  });
           console.log(result)
    await Profile.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { 
          profilePicture: result.secure_url,

         },
      }
    );
    console.log("profile updated");
    res.redirect(`/profile/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
},
editBanner: async (req, res) => {
  try {

      const result = await cloudinary.uploader.upload(req.file.path, {resource_type: "auto",  });
           console.log(result)
    await Profile.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { 
          bannerPicture: result.secure_url,
         },
      }
    );
    console.log("profile updated");
    res.redirect(`/profile/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
},
editBio: async (req, res) => {
  try {

    
    await Profile.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { 
          bio: req.body.bio
         },
      }
    );
    console.log("profile updated");
    res.redirect(`/profile/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
},

editMove: async (req, res) => {
  try {

    console.log(req.user._id)
    await Moves.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: { 
          eventTitle: req.body.eventTitle,
          description: req.body.description,
          artists: req.body.artists,
          startDate: req.body.startDate,
          startTime: req.body.startTime,
          endDate: req.body.endDate,
          endTime: req.body.endTime,
         },
      }
    );
    console.log("profile updated");
    res.redirect(`/profile/${req.user.id}`);
  } catch (err) {
    console.log(err);
  }
},
}
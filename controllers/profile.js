
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
}
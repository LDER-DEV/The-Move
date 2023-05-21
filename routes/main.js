const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const upload = require("../middleware/multer");
const movesController = require("../controllers/moves");
const radioController = require("../controllers/radio");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/radio", radioController.getRadio);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/profile/:id", ensureAuth, movesController.getProfile);
router.get("/venues", ensureAuth, movesController.getVenues);
router.get("/upcomingMoves", ensureAuth, movesController.getMoves);
router.get("/logout", authController.logout);
router.put("/editProfile/:id", upload.single("imageFiles"), movesController.editProfile);
router.put("/editBanner/:id", upload.single("imageFiles"), movesController.editBanner);


module.exports = router;

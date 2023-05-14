const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const movesController = require("../controllers/moves");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/profile/:id", ensureAuth, movesController.getProfile);
router.get("/venues", ensureAuth, movesController.getVenues);
router.get("/logout", authController.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const movesController = require("../controllers/moves");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, movesController.getPost);

router.post("/comment/:id",  movesController.commentPost);

router.post("/createPost", upload.single("file"), movesController.createPost);

router.post("/addTrack", upload.single("songFile"), movesController.createTrack);

router.put("/likePost/:id", movesController.likePost);

router.delete("/deletePost/:id", movesController.deletePost);

router.delete("/deleteComment/:id", movesController.deleteComment);

module.exports = router;

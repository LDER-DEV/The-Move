const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const movesController = require("../controllers/moves");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, movesController.getEvent);

router.post("/comment/:id",  movesController.commentPost);

router.post("/createPost", upload.single("file"), movesController.createPost);

router.post("/addTrack", upload.single("songFile"), movesController.createTrack);

router.put("/approveMove/:id", movesController.approveMove);

router.put("/denyMove/:id", movesController.denyMove);

router.put("/editMove/:id", movesController.editMove);

router.delete("/deletePost/:id", movesController.deletePost);

router.delete("/deleteTrack/", movesController.deleteTrack);



module.exports = router;

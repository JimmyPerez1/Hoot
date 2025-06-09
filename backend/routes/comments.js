const express = require("express");
const router = express.Router({ mergeParams: true }); 
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require("../middleware/ensureLoggedIn");


router.use(ensureLoggedIn);
router.post("/", commentsCtrl.create);
router.get("/:commentId", commentsCtrl.show);
router.put("/:commentId", commentsCtrl.update);
router.delete("/:commentId", commentsCtrl.deleteComment);

module.exports = router;
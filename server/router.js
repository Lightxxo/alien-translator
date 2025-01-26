const express = require("express");
const router = express.Router();

const controller = require("./controller");


router.post("/share", controller.sharePostController);
router.get("/share", controller.shareGetController);
router.post("/words", controller.wordsPostController);
router.get("/words", controller.wordsGetController);
router.delete("/words/:id", controller.wordsDeleteController);

module.exports = router;

const express = require("express");
const router = express.Router();

const PostController = require("../../controllers/api/Post");

router.post("/", PostController.create);

router.get("/id/:_id", PostController.findOneByID);
router.get("/all", PostController.findAll);

router.put("/", PostController.updatePost);
router.patch("/like", PostController.addLike);
router.delete("/", PostController.deleteOneByID);

module.exports = router;
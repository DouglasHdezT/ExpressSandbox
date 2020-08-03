const express = require("express");
const router = express.Router();

const PostRouter = require("./api/Post");

router.use("/post", PostRouter);

module.exports = router;
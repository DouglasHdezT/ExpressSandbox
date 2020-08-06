const express = require("express");
const router = express.Router();

const PostRouter = require("./api/Post");
const AuthRouter = require("./api/Auth")

router.use("/auth", AuthRouter);
router.use("/post", PostRouter);
router.use("/auth", AuthRouter);

module.exports = router;
const express = require("express");
const router = express.Router();

const AuthMiddleware = require("./../middlewares/Auth");

const PostRouter = require("./api/Post");
const AuthRouter = require("./api/Auth");

router.use("/auth", AuthRouter);

router.use(AuthMiddleware.verifyAuth);

router.use("/post", PostRouter);

module.exports = router;

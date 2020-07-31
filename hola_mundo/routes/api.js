const express = require("express");
const router = express.Router();

const users = require("./api/users");
const test = require("./api/test");

router.use("/user", users);
router.use("/test", test);

module.exports = router;
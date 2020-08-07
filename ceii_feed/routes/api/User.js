const express = require("express");
const router = express.Router();

const UserController = require("./../../controllers/api/User");

router.get("/", UserController.getUser);

module.exports = router;
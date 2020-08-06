const express = require("express");
const router = express.Router();

const AuthController = require("./../../controllers/api/Auth");

router.post("/signup", AuthController.register);

module.exports = router;
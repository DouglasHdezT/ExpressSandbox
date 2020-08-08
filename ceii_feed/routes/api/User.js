const express = require("express");
const router = express.Router();

const UserController = require("./../../controllers/api/User");

router.get("/", UserController.getUser);
router.get("/profile/:_id", UserController.getProfile);

router.put("/", UserController.updateByID);
router.patch("/savePost", UserController.savePost)

module.exports = router;
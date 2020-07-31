const express = require("express");
const router = express.Router()
const testController = require("../../controllers/api/test");

router.get("/data", testController.getData);
router.get("/person", testController.getPerson);
router.get("/statusTest", testController.statusTest);

module.exports = router;
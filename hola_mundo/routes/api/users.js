var express = require('express');
var router = express.Router();
const users = require("../../controllers/api/users");

/* GET users listing. 
	/users/
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/test", (req, res, next) => { 
	res.send("Test")
})

router.post("/signup", users.signUp);

module.exports = router;

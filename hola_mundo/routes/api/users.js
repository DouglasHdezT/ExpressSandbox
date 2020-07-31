var express = require('express');
var router = express.Router();

/* GET users listing. 
	/users/
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/test", (req, res, next) => { 
	res.send("Test")
})

module.exports = router;

var express = require('express');
var router = express.Router();

function checkAuthentication(req,res){
  console.log("passed here ")
  next()

}

/* GET users listing. */
router.get('/',checkAuthentication, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

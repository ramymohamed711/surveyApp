var express = require('express');

var { jwt, auth, passport, jwtOptions, md5 } = require('../service/login')
var router = express.Router();

//router.use(passport.initialize());
router.post("/login", function (req, res) {
  if (req.body.name && req.body.password) {
    var name = req.body.name;
    var password = req.body.password;
  }
  // usually this would be a database call:
  const promise = new Promise(function (resolve, reject) {
    console.log(name + " --- " + password)
    req.userCol.findOne({'userName': name},function(err, doc) {
      if (err) throw err
      console.log(doc)
      resolve(doc)
    })
  })


  var user = promise.then(user=>{
    console.log(user.password + " EEE " + md5(md5(password)))
    if (!user) {
      res.status(401).json({ message: "no such user found" });
    }

    if (user.password === md5(md5(password))) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = { id: user.userID };
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ message: "ok", token: token });
    } else {
      res.status(401).json({ message: "passwords did not match" });
    }
  })
  })

router.use(auth);

module.exports = router;

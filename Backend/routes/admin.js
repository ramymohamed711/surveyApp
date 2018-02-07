var express = require('express');
var rx = require('@reactivex/rxjs')

var { jwt, auth, passport, jwtOptions, md5 } = require('../service/login')
var router = express.Router();
var {createsurvey} = require('../service/createsurvey')
var SurveService = require('../service/surveyService')

//router.use(passport.initialize());
router.post("/login", function (req, res) {
  console.log(req.body)
  const promise = new Promise(function (resolve) {
    // get the request body and set it in a promise object
    resolve(req)
  })

  promise.then(req => {
    // get the credential from the request body
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
    }

    const dbPromise = new Promise(function (accept) {
      accept(req.userCol)
    })

    dbPromise.then(db => {
      // usually this would be a database call:
      db.findOne({ 'userEmail': email }, function (err, user) {
        if (err) throw err
        if (!user) {
          res.status(401).json({ message: "no such user found" });
        }
        if (user && user.password === md5(md5(password))) {
          // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
          var payload = { id: user.userID };
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.status(200).json({ message: "ok", token: token });
        } else if (user && user.password !== md5(md5(password))) {
          res.status(401).json({ message: "passwords did not match" });
        }
      })
    })

  })
})

//router.use(auth);
router.get('/check/:token', function (req, res) {
  if (auth(req, res))
    res.status(200).json({ message: true })
  else
    res.status(403).json({ message: false })
})


router.post('/survey/create', function (req, res) {
  var survey;
  if (auth(req, res)) {
    createsurvey(req)
    res.status(200).json({ message: true })
  }
  else
    res.status(403).json({ message: "incorrect token pleas login" })
})

router.get('/surveys',function(req,res){
  if(auth(req,res)){
    
    SurveService.getAllSurveys(req)
    .then(data=>res.status(200).json({data:data}))
    .catch(err=>console.log(err))
  }
 else
  res.status(403).json({ message: "incorrect token pleas login" })
})

module.exports = router;

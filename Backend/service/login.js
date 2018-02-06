var express = require('express');
var passport = require("passport");
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var md5 = require('md5');
// The Authentication options that read the toke from the body
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//the secert key which used in token creation
jwtOptions.secretOrKey = 'tasmanianDevil';


//define the strategy of getting the user
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, { id: jwt_payload.id })];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

//apply the strategy 
passport.use(strategy);

//Middleware of all other user actions, check the token
const auth = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.query.token || req.headers.authorization;
  let validate = false;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtOptions.secretOrKey, function (err, decoded) {
      if (err) {
        validate= false;
      } else {
        validate=  true
      }
    });
  } 
  else {
    console.log("No token")
    validate = false;
  }
return validate;
};

module.exports = { jwt, auth, passport, jwtOptions, md5 }
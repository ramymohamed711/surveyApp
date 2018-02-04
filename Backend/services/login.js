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
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

//apply the strategy 
passport.use(strategy);

//Middleware of all other user actions, check the token
const auth = function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token)
 // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtOptions.secretOrKey, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        console.log(decoded)
        // next();
        res.send(decoded)
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
};

module.exports = {jwt , auth, passport , jwtOptions , md5}
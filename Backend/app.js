var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// const mongoClient = require('mongodb').MongoClient;

var mongoose = require('mongoose');
const passport = require('passport');
var configDB = require('./config/database.js');

// configuration ===============================================================
// require('./config/passport')(passport); // pass passport for configuration

var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var port = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// required for passport
app.use(session({ secret: 'welcometoourproject' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

let db = null;
app.use((req,res,next)=> {
    "use strict";
    if (db) {
        req.db = db;
        next();
    }
    else {
        // connect to our database
        mongoose.connect(configDB.url, (err, client) => {
            if (err) throw new Error('Can\'t connect to survey database');
            db = client.db('survey572');
            req.db = db;
            next();

        // mongoClient.connect("mongodb://ramymwp:ramymwp@ds125068.mlab.com:25068/survey572", (err, client) => {
        //     if (err) throw new Error('Can\'t connect to survey database');
        //     db = client.db('survey572');
        //     req.db = db;
        //     next();
        });
    }
});
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port);
console.log('The magic happens on port ' + port);
module.exports = app;

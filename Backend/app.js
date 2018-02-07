var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


const mongoClient = require('mongodb').MongoClient;
var configDB = require('./config/database.js');

var client = require('./routes/client');
var users = require('./routes/users');
var admin = require('./routes/admin');
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
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy',true);

// allow Access-Control-Allow-Origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization , Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    next();
  });

// connect to our database using mongo client
let db = null;
app.use((req, res, next) => {
    if (db) {
        req.col = db.collection('survey');
        req.userCol = db.collection('users');
        next();

    }
    else {
        mongoClient.connect(configDB.url, (err, client) => {
            if (err) throw new Error('Can\'t connect to survey database');
            db = client.db('survey572');
            req.col = db.collection('survey');
            req.userCol = db.collection('users');
            next();
        });
    }
});


app.use('/client', client);
app.use('/users', users);
app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



app.listen(port);
console.log('The magic happens on port ' + port);
module.exports = app;

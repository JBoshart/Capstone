var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var dotenv = require('dotenv').config()
var passport = require('passport');
var FaceStrategy = require('passport-facebook').Strategy;
var massive = require('massive');

var app = module.exports = express();

var Users = require("./models/users")

// passport-facebook:
passport.use(new FaceStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/facebook/return'
},
function(accessToken, refreshToken, profile, cb) {
  var current_user = {}//Users.findOrMake(profile)
  return cb(null, current_user)
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  var current_user = {}//Users.findOrMake(obj)
  cb(null, current_user);
});

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: process.env.SECRET_SECRET,
  resave: true,
  saveUninitialized: true }))

// database
var connectionString = "postgres://localhost/AspirationalVegetables";
var db = massive.connectSync({connectionString: connectionString});
app.set('db', db);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
var index = require('./routes/index');
var users = require('./routes/users');

app.use('/', index);
app.use('/', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

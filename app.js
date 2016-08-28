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

// database
var connectionString = "postgres://localhost/AspirationalVegetables";
var db = massive.connectSync({connectionString: connectionString});
app.set('db', db);

var UserModel = require('./models/users')

// passport-facebook:
passport.use(new FaceStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/login/facebook/return'
},
function(accessToken, refreshToken, profile, cb) {
  UserModel.findOrMakeUser(profile, function (error, user_info) {
  return cb(null, user_info)
  })
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findOne({id: id}, function(error, user) {
    cb(error, user);
  })
});

app.use(session({
  secret: process.env.SECRET_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }}))

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use(function(request, response, next) {
  if (request.user || request.path === "/" || request.path.startsWith('/login')) {
    next()
  } else {
    response.redirect("/")
  }
})

var index = require('./routes/index');
var users = require('./routes/users');
var items = require('./routes/items')
var recipes = require('./routes/recipes')

app.use('/', index);
app.use('/', users)
app.use('/', items)
app.use('/', recipes)

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

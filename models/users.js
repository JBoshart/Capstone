var app = require("../app");
var db = app.get("db");
var bcrypt = require('bcrypt-nodejs')

var Users = function() {
  // constructor? I dunno. I'm just following patterns at the moment. This will likely change.
}

Users.makePasswordHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// must take in password from signin, pull password hash from db, and compare.
Users.validPassword = function(password) {
  var dbPassword = "boop" //call to database to pull hash?
  return bcrypt.compareSync(password, dbPassword);
}

// What does this actually doooooo?
Users.isLoggedIn = function(user_id, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
    response.redirect('/')
  }
module.exports = Users

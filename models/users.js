var app = require("../app");
var db = app.get("db");
var bcrypt = require('bcrypt-nodejs')

var Users = function() {
  // constructor? I dunno. I'm just following patterns at the moment. This will likely change.
}

Users.isLoggedIn = function(user_info, response, next) {
  // db.users.find
  // Find or create account with user_info coming from facebook
  }

module.exports = Users

var app = require("../app");
var db = app.get("db");
var bcrypt = require('bcrypt-nodejs')

var Users = function() {
  // constructor? I dunno. I'm just following patterns at the moment. This will likely change.
}

Users.findOrMakeUser = function(facebook_id, callback) {
  db.users.findOne(facebook_id, function(error, user) {
    if (error) {
      callback(error || new Error("User could not be found or created"), undefined);
    } else if (!user) {
      db.users.insert({facebook_id: facebook_id}, function(error, newUser) {
        if (error || !newUser) {
          callback(error || new Error("User could not be created"))
        } else {
          callback(null, newUser)
        }})
    } else {
      callback(null, facebook_id)
    }
  })
 }

Users.isLoggedIn = function(user_info, response, next) {
  // db.users.find
  // Find or create account with user_info coming from facebook
  }

module.exports = Users

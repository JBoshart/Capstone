var app = require("../app");
var db = app.get("db");

var Users = function() {
  // constructor? I dunno. I'm just following patterns at the moment. This will likely change.
}

Users.findOrMakeUser = function(sessionInfo, callback) {
  db.users.findOne({facebook_id: sessionInfo.id}, function(error, user) {
    if (error) {
      callback(error || new Error("User could not be found or created"), undefined);
    } else if (!user) {
      db.users.save({name: sessionInfo.displayName, facebook_id: sessionInfo.id}, function(error, newUser) {
        if (error || !newUser) {
          callback(error || new Error("User could not be created"))
        } else {
          callback(null, newUser)
        }})
    } else {
      callback(null, user)
    }
  })
 }

Users.isLoggedIn = function(user_info, response, next) {
  // db.users.find
  // Find or create account with user_info coming from facebook
  }

module.exports = Users

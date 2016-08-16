var app = require("../app");
var db = app.get("db");

var Users = function() {}

Users.findOrMakeUser = function(sessionInfo, callback) {
  db.users.findOne({facebook_id: sessionInfo.id}, function(error, user) {
    if (error) {
      callback(error, undefined);
    } else if (!user) {
      db.users.save({name: sessionInfo.displayName, facebook_id: sessionInfo.id, score: 0}, function(error, newUser) {
        if (error || !newUser) {
          callback(error, undefined)
        } else {
          callback(null, newUser)
        }
      })
    } else {
      callback(null, user)
    }
  })
}

module.exports = Users

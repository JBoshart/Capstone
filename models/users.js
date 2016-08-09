var app = require("../app");
var db = app.get("db");

var Users = function() {
  // constructor? I dunno. I'm just following patterns at the moment. This will likely change.
}

// What does this actually doooooo? 
Users.isLoggedIn = function(user_id, response, next) {
    if (request.isAuthenticated()) {
      return next();
    }
    response.redirect('/')
  }
module.exports = Users

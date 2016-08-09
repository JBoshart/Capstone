var Users = require("../models/users");
var passport = require('passport');

var UsersController = {
  getFacebookLogin: passport.authenticate('facebook'),

  getFacebookReturn: passport.authenticate('facebook', { failureRedirect: '/' }),
    function(request, response) {
      console.log("I did it.")
      response.redirect('/', request.user.user_id)
    },

  getLogout: function(request, response) {
    request.logout()
    response.redirect('/')
  },

  getProfile: function(request, response) {
    Users.isLoggedIn(request.params.user_id, function(error, user) {
      if(error) {
        var err = new Error
        err.status = 500;
        err.error = "Error retrieving user info."
        response.json(err)
      } else {
        response.render('profile', {user_info: user})
      }
    })
  }
}

module.exports = UsersController

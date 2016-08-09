var Users = require("../models/users");
var passport = require('passport');

var UsersController = {
  getLogin: function(request, response) {
    var locals = {}
    response.render('login', locals)
  },

  postLogin: function(request, response) {
    // Call to model to check hashes?
    passport.authenticate('local', { failureRedirect: '/login' }),
    response.redirect('/')
  },

  getSignUp: function(request, response) {
    var locals = {}
    response.render('signup', locals)
  },

  postSignUp: function(request, response) {

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

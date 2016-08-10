var Users = require("../models/users");
var passport = require('passport');

var UsersController = {
  isLoggedIn: function(request, response) {
    if (request.user) {
      console.log('success')
      next()
    } else {
      response.redirect('/login')
    }
  },

  getFacebookLogin: passport.authenticate('facebook'),

  getFacebookReturn: function(request, response) {
    var facebook_id = request.user.id
    Users.findOrMakeUser(facebook_id, function (error, user_info) {
      if (error) {
        var err = new Error
        err.status = error.status
        err.error = error.message
        response.json(err)
      } else {
        locals = {user_info: request.user}
        response.render('profile', locals)
      }
    })
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

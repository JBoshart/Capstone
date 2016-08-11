var Users = require("../models/users");
var passport = require('passport');

var UsersController = {

  getLogout: function(request, response) {
    request.logout()
    response.redirect('/')
  },

  getProfile: function(request, response) {
    response.render('profile', {user: request.user})
  }
}

module.exports = UsersController

var express = require('express');
var passport = require('passport')
var router = express.Router();
var Controllers = require('../controllers/users')

router.get('/login', Controllers.getLogin)

// router.get('/signup', function(request, response) {
//   response.render('signup.ejs', { })
// });
//
// router.get('/profile', isLoggedIn, function(request, response) {
//   response.render('profile.ejs', { user: request.user})
// })
//
// router.get('/logout', function(request, response) {
//   request.logout()
//   response.redirect('/')
// })
//
// function isLoggedIn(request, response, next) {
//   if (request.isAuthenticated()) {
//     return next();
//   }
//
//   response.redirect('/')
// }

module.exports = router;

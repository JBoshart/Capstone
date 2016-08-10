var express = require('express');
var passport = require('passport')
var router = express.Router();
var Controllers = require('../controllers/users')

router.get('/login/facebook', Controllers.getFacebookLogin)
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }), Controllers.getFacebookReturn)

router.get('/profile', Controllers.getProfile)
router.get('/logout', Controllers.getLogout)

module.exports = router;

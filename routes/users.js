var express = require('express');
var passport = require('passport')
var router = express.Router();
var Controllers = require('../controllers/users')

// facebook authentication via passport:
router.get('/login/facebook', passport.authenticate('facebook'))
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/profile' }))

router.get('/profile', Controllers.getProfile)
router.get('/logout', Controllers.getLogout)

module.exports = router;

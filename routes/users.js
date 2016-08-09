var express = require('express');
var passport = require('passport')
var router = express.Router();
var Controllers = require('../controllers/users')

router.get('/login', Controllers.getLogin)
router.post('/login', Controllers.postLogin)

router.get('/signup', Controllers.getSignUp)
router.post('/signup', Controllers.postSignUp)

router.get('/profile', Controllers.getProfile)
router.get('/logout', Controllers.getLogout)

module.exports = router;

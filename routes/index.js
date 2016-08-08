var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/index')

/* GET home page. */
router.get('/', Controllers.getIndex);

module.exports = router;

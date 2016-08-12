var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/fridge')

/* GET home page. */
router.get('/fridge', Controllers.getFridge);

module.exports = router;

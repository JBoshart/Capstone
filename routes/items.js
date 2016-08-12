var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/items')

/* GET home page. */
router.post('/items', Controllers.addItems);

module.exports = router;

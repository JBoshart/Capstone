var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/items')

router.post('/items', Controllers.addItems);
router.post('/items/subtract', Controllers.subtractItems)

module.exports = router;

var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/recipes')

/* GET home page. */
router.get('/recipes', Controllers.getRecipes);

module.exports = router;

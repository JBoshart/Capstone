var express = require('express');
var router = express.Router();
var Controllers = require('../controllers/recipes')

/* GET home page. */
router.post('/recipes', Controllers.getRecipes);
router.get('/recipes/:id/:score', Controllers.getInstructions)

module.exports = router;

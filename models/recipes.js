var app = require("../app")
var db = app.get("db")
var unirest = require('unirest')
var dotenv = require('dotenv').config()

var Recipes = function() {}

var basic_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="
var basic_rest = "&limitLicense=true&number=5&ranking=1"

var advanced_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"
var advanced_rest = "/analyzedInstructions?stepBreakdown=true"


Recipes.getBasic = function (ingredients, callback) {
  unirest.get(url + ingredients + rest_of_url)
  .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
  .header("Accept", "application/json")
  .end(function (result) {
    callback(null, result.body)
  })
}

Recipes.getAdvanced = function (recipe_id, callback) {
  unirest.get(advanced_url + recipe_id + advanced_rest)
 .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
 .header("Accept", "application/json")
 .end(function (res) {
    var steps = res.body[0].steps
    var instructions = {}

    // extract needed info:
    for (var i=0; i<steps.length; i++) {
      instructions[i] = steps[i].step
    }

    callback(null, instructions)
 });
}

module.exports = Recipes

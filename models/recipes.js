var app = require("../app")
var db = app.get("db")
var unirest = require('unirest')
var dotenv = require('dotenv').config()

var Recipes = function() {}

var basic_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="
var basic_rest = "&limitLicense=true&number="

var advanced_url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/"
var advanced_rest = "/information?includeNutrition=false"


Recipes.getBasic = function (limitInfo, sessionInfo, callback) {
  db.items.where("user_id=$1 ORDER BY expiration LIMIT $2", [sessionInfo.id, limitInfo.items], function(error, items) {
    // Format for search query:
    var ingredients = ""
    for (var i=0; i<items.length; i++) {
      ingredients += items[i].name + ","
    }
    ingredients = ingredients.slice(0, -1)

    // search API:
    unirest.get(basic_url + ingredients + basic_rest + limitInfo.options + "&ranking=1")
    .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
    .header("Accept", "application/json")
    .end(function (result) {
      var locals = {
        basic: true,
        base_score: ((6 - limitInfo.options) * 100),
        recipes: result.body,
        itemNumber: limitInfo.items
      }
      callback(null, locals)
    })
  })
}

Recipes.getAdvanced = function (recipe_id, score, callback) {
  unirest.get(advanced_url + recipe_id + advanced_rest)
  .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
  .end(function (result) {
    var ingredients = result.body.extendedIngredients
    var ingredients_condensed = []

    // Distill out only needed info:
    for (var i=0; i<ingredients.length; i++) {
      var ingredient = {
        name: ingredients[i].name,
        quantity: ingredients[i].amount,
        unit: ingredients[i].unit,
        inText: ingredients[i].originalString
      }
      ingredients_condensed.push(ingredient)
    }

    compiled = {
      advanced: true,
      id: result.body.id,
      score: score,
      title: result.body.title,
      image: result.body.image,
      time: result.body.readyInMinutes,
      ingredients: ingredients_condensed,
      instructions: result.body.instructions
    }
    callback(null, compiled)
  });
}

module.exports = Recipes

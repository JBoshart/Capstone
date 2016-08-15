var Recipes = require("../models/recipes");
var passport = require('passport');
var unirest = require('unirest')
var dotenv = require('dotenv').config()

var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="
var rest_of_url = "&limitLicense=true&number=5&ranking=1"
var ingredients = "apples,flour,sugar"

// example:
//"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar"

var RecipesController = {

  getRecipes: function(request, response) {
    unirest.get(url + ingredients + rest_of_url)
    .header("X-Mashape-Key", process.env.X_MASHAPE_KEY)
    .header("Accept", "application/json")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    })
  }
}

module.exports = RecipesController

var Recipes = require("../models/recipes");
var passport = require('passport');
var unirest = require('unirest')
var dotenv = require('dotenv').config()

var RecipesController = {

  getRecipes: function(request, response) {
    Recipes.getBasic(request.body, request.user, function (error, basic_info) {
      if(error) {
        var err = new Error
        err.status = 500
        err.error = "Not able to find recipes"
        response.json(err)
      } else {
        response.render('recipes', basic_info)
      }
    })
  },

  getInstructions: function(request, response) {
    Recipes.getAdvanced(request.params.id, request.params.score, request.user, function(error, advanced_info) {
      if (error) {
        var err = new Error
        err.status = 500
        err.error = "Unable to find recipe info."
        response.json(err)
      } else {
        response.render("recipes", advanced_info)
      }
    })
  }
}

module.exports = RecipesController

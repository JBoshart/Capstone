var Items = require("../models/items");
var passport = require('passport');

var ItemsController = {

  addItems: function(request, response) {
    Items.addOrMakeItems(request.body, request.user, function(error, item) {
      if(error) {
        var err = new Error
        err.status = 500;
        err.error = "Error adding item to fridge."
        response.json(err)
      } else {
        response.redirect('/profile')
      }
    })
  },

  subtractItems: function(request, response) {
    Items.removeItems(request.body.recipe_id, request.body.recipe_score, request.user, function(error, items) {
      if(error) {
        var err = new Error
        err.status = 500
        err.error = "Error removing item: " + error.message
        response.json(err)
      } else if (items.update.length !== 0) {
        response.render("recipes", items)
      } else {
        response.redirect("/profile")
      }
    })
  },

  manualUpdate: function(request, response) {
    Items.removeManual(request.body, request.user, function(error, items) {
      if(error) {
        var err = new Error
        err.status = 500
        err.error = "Error removing item: " + error.message
        response.json(err)
      } else {
        response.redirect("/profile")
      }
    })
  }
}

module.exports = ItemsController

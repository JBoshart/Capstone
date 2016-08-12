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
        response.redirect('/fridge')
      }
    })
  }
}

module.exports = ItemsController

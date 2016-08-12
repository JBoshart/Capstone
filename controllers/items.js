var Items = require("../models/items");
var passport = require('passport');

var ItemsController = {

  addItems: function(request, response) {
    Items.addItems(request.body, request.user, function(error, fridge_info) {
      if(error) {
        var err = new Error
        err.status = 500;
        err.error = "Error adding item to fridge."
        response.json(err)
      } else {
        response.render('fridge', {
          user: request.user,
          fridge_id: fridge_info.fridge_id,
          items: fridge_info.items
        })
      }
    })
  }
}

module.exports = ItemsController

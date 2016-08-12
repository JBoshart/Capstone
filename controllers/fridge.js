var Fridge = require("../models/fridge");
var passport = require('passport');

var FridgeController = {

  getFridge: function(request, response) {
    console.log("got to controller")
    Fridge.findOrMakeFridge(request.user.id, function(error, fridge_info) {
      if(error) {
        var err = new Error
        err.status = 500;
        err.error = "Error retrieving customer's current rentals."
        response.json(err)
      } else {
        response.render('fridge', {
          user: request.user,
          fridge_id: fridge_info.id,
          items: fridge_info.items
        })
      }
    })
  }
}

module.exports = FridgeController

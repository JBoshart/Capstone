var Fridge = require("../models/fridge");
var passport = require('passport');

var FridgeController = {

  getFridge: function(request, response) {
    Fridge.findOrMakeFridge(request.user.id, function(error, fridge_info) {
      if(error) {
        var err = new Error
        err.status = 500;
        err.error = "Error retrieving user's fridge."
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

module.exports = FridgeController
